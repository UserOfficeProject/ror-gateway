import { open, Entry, ZipFile } from "yauzl";
import { createWriteStream, mkdirSync } from "fs";
import axios, { AxiosResponse } from "axios";
import fs from "fs";
import path from "path";

async function getZenodoRecords(): Promise<any> {
  const url =
    process.env.ZENODO_URL ||
    "https://zenodo.org/api/records/?communities=ror-data&sort=mostrecent";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      `Failed to fetch Zenodo records: ${(error as Error).message}`
    );
  }
}

async function downloadFile(
  sourceUrl: string,
  destinationPath: string
): Promise<void> {
  try {
    const response: AxiosResponse<fs.ReadStream> = await axios.get(sourceUrl, {
      responseType: "stream",
    });

    const writer = fs.createWriteStream(destinationPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error: unknown) {
    throw new Error(`Failed to download file: ${(error as Error).message}`);
  }
}
function createFolder(folderPath: string): void {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folder created: ${folderPath}`);
  } else {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      fs.rmSync(filePath, { recursive: true, force: true });
      console.log(`Deleted file: ${filePath}`);
    });

    console.log(`Folder cleared: ${folderPath}`);
  }
}
function extractZip(zipFilePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    open(
      zipFilePath,
      { lazyEntries: true },
      (error: Error | null, zipfile: ZipFile) => {
        if (error) {
          reject(new Error(`Failed to open ZIP file: ${error.message}`));
          return;
        }

        const extractDir = zipFilePath.replace(".zip", "");

        mkdirSync(extractDir, { recursive: true });

        zipfile.readEntry();
        zipfile.on("entry", (entry: Entry) => {
          const entryPath = `${extractDir}/${entry.fileName}`;

          if (/\/$/.test(entry.fileName)) {
            // Create directory entry
            mkdirSync(entryPath, { recursive: true });
            zipfile.readEntry();
          } else {
            // Create file entry
            zipfile.openReadStream(
              entry,
              (err: Error | null, readStream: any) => {
                if (err) {
                  reject(
                    new Error(`Failed to read entry stream: ${err.message}`)
                  );
                  return;
                }

                const writeStream = createWriteStream(entryPath);
                readStream.pipe(writeStream);

                writeStream.on("finish", () => {
                  zipfile.readEntry();
                });

                writeStream.on("error", (err: Error) => {
                  reject(
                    new Error(`Failed to write entry stream: ${err.message}`)
                  );
                });
              }
            );
          }
        });

        zipfile.on("end", () => {
          zipfile.close();
          resolve();
        });

        zipfile.on("error", (err: Error) => {
          reject(new Error(`Failed to extract ZIP file: ${err.message}`));
        });
      }
    );
  });
}

function getFirstCsvFileInDirectory(directoryPath: string): string | null {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileExtension = path.extname(filePath);

    if (fileExtension === ".csv") {
      return filePath;
    }
  }

  return null;
}

export async function downloadZenodoCsv(): Promise<string> {
  const data = await getZenodoRecords();
  const url = data[0].files[0].links.download;

  const tmpDir = "./tmp";
  const tmpZipFile = `${tmpDir}/data.zip`;

  createFolder(tmpDir);
  await downloadFile(url, tmpZipFile);
  await extractZip(tmpZipFile);

  const csvFileName = getFirstCsvFileInDirectory(`${tmpDir}/data`);

  if (!csvFileName) {
    throw new Error("No CSV file found in the zip file");
  }

  return csvFileName;
}

import { Request, Response } from "express";
import { downloadZenodoCsv } from "./../cache/downloadZenodoCsv";
import { importDataFromCSV } from "./../cache/importDataFromCSV";

export default async (_req: Request, res: Response) => {
  try {
    const filePath = await downloadZenodoCsv();
    const csvColumns = [
      "name",
      "types",
      "status",
      "country.country_name",
      "country.country_code",
    ];
    const dbFields = [
      "name",
      "types",
      "status",
      "country_name",
      "country_code",
    ];

    importDataFromCSV(filePath, csvColumns, dbFields)
      .then(() => {
        console.log("Data imported successfully!");
        res.sendStatus(200);
      })
      .catch((error: Error) => {
        console.error("Error importing data:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred", message: (error as Error)?.message });
  }
};

import fs from "fs";
import csvParser from "csv-parser";
import knex from "../db/db";

export const importDataFromCSV = async (
  filePath: string,
  csvColumns: string[],
  dbFields: string[]
): Promise<void> => {
  try {
    await knex("organizations").truncate();
    const stream = fs.createReadStream(filePath).pipe(csvParser());

    for await (const row of stream) {
      const data: any = {};

      // Map the CSV columns to the database fields
      for (let i = 0; i < csvColumns.length; i++) {
        data[dbFields[i]] = row[csvColumns[i]];
      }

      // Insert the data into the PostgreSQL table

      await knex("organizations").insert(data);
    }
  } catch (error) {
    console.log(error);
  }
};

import { Request, Response } from "express";
import knex from "../db/db";
import { Country, Organization } from "../dto/ror";
import { SearchQuery } from "./organizations";

export default async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  const { query, country } = req.query;

  try {
    // Query the database using Knex
    const knexQuery = knex("organizations")
      .select("name", "types", "status", "country_name", "country_code")
      .where("name", "like", `%${query}%`);

    if (country) {
      knexQuery.andWhere("country_code", country.toUpperCase());
    }

    const results = await knexQuery;

    // Transform the results to the desired object type
    const organizations: Organization[] = results.map((result: any) => {
      const { name, types, status, country_name, country_code } = result;
      const country: Country = { country_name, country_code };
      return { name, types, country, status };
    });

    res.json(organizations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

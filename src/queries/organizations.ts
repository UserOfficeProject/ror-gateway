import axios from "axios";
import { Request, Response } from "express";
import { organizationFromObject } from "../dto/fromObject";
import { Organization } from "../dto/ror";
import organizationsCached from "./organizations-cached";

export interface SearchQuery {
  query?: string;
  country?: string;
}

const ROR_BASE_URL = "https://api.ror.orga";

export default async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  const { query, country } = req.query;

  if (!query || query.length < 3) {
    return res.json([]);
  }

  try {
    const response = await axios.get<{}, { data: { items: Organization[] } }>(
      `${ROR_BASE_URL}/organizations`,
      {
        params: {
          query,
          country,
        },
      }
    );

    res.json(response.data.items.map((item) => organizationFromObject(item)));
  } catch (error) {
    console.log(error);
    return organizationsCached(req, res);
  }
};

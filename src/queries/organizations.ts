import axios from "axios";
import { Request, Response } from "express";
import { organizationFromObject } from "../dto/fromObject";
import { Organization } from "../dto/ror";

export interface SearchQuery {
  query?: string;
}

const ROR_BASE_URL = "https://api.ror.org";

export default async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  try {
    const response = await axios.get<{}, { data: { items: Organization[] } }>(
      `${ROR_BASE_URL}/organizations`,
      {
        params: req.query,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
};

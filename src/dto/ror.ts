export interface Country {
  country_name: string;
  country_code: string;
}

export interface Organization {
  name: string;
  types: string[];
  country: Country;
  status: string;
}

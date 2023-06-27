import { Country, Organization } from "./ror";

function countryFromObject(country: Country): Country {
  const { country_name, country_code } = country;

  return {
    country_name,
    country_code,
  };
}

export function organizationFromObject(
  organization: Organization
): Organization {
  const { name, types, country, status } = organization;

  return {
    name,
    types,
    country: countryFromObject(country),
    status,
  };
}

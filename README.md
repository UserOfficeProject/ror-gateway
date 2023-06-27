# ror-gateway
This repository contains gateway for ROR (Research Organization Registry)

- Call /update to synchronize gateway fallback database in case ROR APIs are unavailable.
- Call /organizations?query=<string>&country=<country_code> to retrieve the results (query must be at least 3 characters long, country is optional parameter to filter organizations in one country)
- See "public" folder for UI integration example



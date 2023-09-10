# ror-gateway

Welcome to the ror-gateway repository! This project serves as a gateway for ROR (Research Organization Registry), providing convenient access to its functionalities.

## Features

- Retrieve results by making a call to `/organizations?query=<string>&filter=country.country_code:<COUNTRY_CODE>`. Please note that the `query` parameter must be at least 3 characters long. Additionally, you can use the optional `country` parameter to filter organizations by country.
- For a UI integration example, please refer to the "public" folder.

We encourage you to explore and leverage the capabilities of this gateway to interact with the ROR database effectively.

## Getting Started

To get started with the ror-gateway, please follow the steps below:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Configure any necessary environment variables. (see .env.sample)
4. Run the application using `npm dev`.
5. Build the application using `npm build`.
6. Run the application using `npm start`.
7. Access the gateway's features via http://localhost:3000.

Feel free to customize and enhance the gateway as per your requirements. We appreciate contributions and suggestions from the community to make this project even better.

## Issues and Feedback

If you encounter any issues or have any feedback, please don't hesitate to open an issue in the GitHub repository. We value your input and strive to address any problems promptly.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code by the terms specified in the license.

Thank you for your interest in the ror-gateway project. We hope it proves to be a valuable tool for your research organization-related needs.

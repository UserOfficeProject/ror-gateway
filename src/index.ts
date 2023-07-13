import cors from "cors"; // Add this line
import { configDotenv } from "dotenv";
import express from "express";
import health from "./queries/health";
import organizations from "./queries/organizations";

configDotenv();

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(cors());

app.get("/organizations", organizations);
app.get("/health", health);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import health from "./queries/health";
import organizations from "./queries/organizations";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/organizations", organizations);
app.get("/health", health);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

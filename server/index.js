import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(express.static("public"));

dotenv.config();

app.use(cors());

app.use(express.json());

const port = process.env.SNAPS_PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

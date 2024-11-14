import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRoutes from "./routes/gamesRoutes.js";
import axios from "axios";
import fs from "fs";

const app = express();

app.use(express.static("public"));

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/games", gamesRoutes);

const port = process.env.SNAPS_PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

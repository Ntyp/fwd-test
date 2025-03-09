import express from "express";
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const dotenv = require("dotenv").config();

import apiRoutes from "./routes/api";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

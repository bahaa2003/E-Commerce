import express from "express";
import "dotenv/config";
import { dbConnection } from "./database/dbConnection.js";
import morgan from "morgan";
import { init } from "./src/modules/index.routers.js";
import cors from "cors";
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(morgan("dev"));

init(app);
dbConnection();
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection", err);
});

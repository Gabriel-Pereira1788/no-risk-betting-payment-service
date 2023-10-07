require("dotenv").config();
import express from "express";
import cors from "cors";
import routes from "./app/routes";
import bodyParser from "body-parser";
import { Server } from "./server";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes.router);

app.set("view engine", "ejs");
app.set("views", "./dist/views");
app.use(bodyParser.json());

Server.start(app)
require("dotenv").config();
import express from "express";
import cors from "cors";
import routes from "./app/routes";
import bodyParser from "body-parser";
import { Server } from "./server";
import socketIO from "./socket";
// import { Socket } from "./socket";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes.router);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.json());


// Socket.start()
// socketIO.start()
Server.start(app)
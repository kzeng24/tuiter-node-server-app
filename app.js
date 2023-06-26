import express from "express"; // creates an instance of the express library using ES6
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
//  Cross Origin Resource Sharing -> establishes the rules by which resources can be shared across domains (origins)
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose"; // load the mongoose library
import MongoStore from "connect-mongo";
import { configDotenv } from "dotenv";

configDotenv();

// Node.js server uses the controllers to talk to the user interface and the DAOs to talk to the database.
// The server sits between these two layers so it is referred to as the middle tier in a multi tiered application.

// connect to the tuiter database
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";
mongoose.connect(CONNECTION_STRING);

// configures HTTP server listening for incoming requests
const app = express();

app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      sameSite: "none", // the important part
      secure: false, // the important part, changed for local testing
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: CONNECTION_STRING,
      ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    }),
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json()); // for parsing application/json (helpful when we use ...req.body from json)

HelloController(app);
UserController(app);
TuitsController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);
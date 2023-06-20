import express from "express"; // creates an instance of the express library using ES6
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
//  Cross Origin Resource Sharing -> establishes the rules by which resources can be shared across domains (origins)
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose"; // load the mongoose library

// Node.js server uses the controllers to talk to the user interface and the DAOs to talk to the database.
// The server sits between these two layers so it is referred to as the middle tier in a multi tiered application.

// connect to the tuiter database
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";
mongoose.connect(CONNECTION_STRING);

// configures HTTP server listening for incoming requests
const app = express();

app.set("trust proxy", 1);
app.use(
  // configure cors as middleware
  // restrict cross origin resource sharing to the react application
  cors({
    credentials: true,
    // origin: "https://a6--teal-macaron-785a52.netlify.app",
    origin: "http://localhost:3000",
  }),
  // configure server session
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
    secure: true,
    proxy: true,
  })

  //   session({
  //   secret: "any string",
  //   resave: false,
  //   saveUninitialized: false,
  //   proxy: true,
  //   cookie: {
  //     sameSite: "none",
  //     secure: true
  //   }
  // })
);

app.use(express.json()); // for parsing application/json (helpful when we use ...req.body from json)

HelloController(app);
UserController(app);
TuitsController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);
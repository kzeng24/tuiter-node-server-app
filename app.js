// creates/configures HTTP server listening for incoming requests

import express from "express"; // creates an instance of the express library using ES6
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
//  Cross Origin Resource Sharing -> establishes the rules by which resources can be shared across domains (origins)
import cors from "cors";
import session from "express-session";

const app = express();
app.use(express.json()); // for parsing application/json (helpful when we use ...req.body from json)

app.use(
  // configure cors as middleware
  // restrict cross origin resource sharing to the react application
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
  // configure server session
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
  })
);

HelloController(app);
UserController(app);
TuitsController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);

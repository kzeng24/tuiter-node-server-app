// NEW: CONTROLLER USING DATA MODEL
import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = async(req, res) => {
    const username = req.body.username;
    const existingUser = await usersDao.findUserByUsername(username);
    // return error if user already exists
    if (existingUser) {
      res.sendStatus(409);
      return;
    }
    const newUserJson = { ...req.body, firstName: "", lastName: ""};
    const newUser = await usersDao.createUser(newUserJson);
    // set user session
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      // set user session
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
    return;
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };



  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);

};

export default AuthController;

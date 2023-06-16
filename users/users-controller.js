// OLD: sample controller that works with users.js hardcoded data
import * as usersDao from "./users-dao.js";

const UserController = (app) => {
  app.get("/api/users", findUsers);
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users", update);
};

const findUsers = async(req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
};

const findUserById = async(req, res) => {
    const uid = req.params.uid;
    const user = await usersDao.findUserById(uid);
    res.json(user);
};

const createUser = async(req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
};

const deleteUser = async(req, res) => {
    const id = req.params.uid;
    const status = await usersDao.deleteUser(id);
    res.sendStatus(200);
};

const update = async (req, res) => {
  const currentUser = req.session["currentUser"];
  const uid = currentUser._id;
  const user = await usersDao.findUserById(uid);
  if (user !== null) {
    await usersDao.updateUser(uid, req.body);
    res.json(await usersDao.findUserById(uid));
  }
};

export default UserController;

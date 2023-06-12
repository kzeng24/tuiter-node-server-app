// OLD: sample controller that works with users.js hardcoded data
import people from "./users.js";
let users = people;

const UserController = (app) => {
  app.get("/api/users", findUsers);
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
};

const findUsers = (req, res) => {
    const type = req.query.type;
    if (type) {
        const usersOfType = users.filter(u => u.type === type);
        res.json(usersOfType);
        return;
    } else {
        res.json(users);
    }
};

const findUserById = (req, res) => {
    const uid = req.params.uid;
    const user = users.find((u) => u._id === uid);
    res.json(user);
};

const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date().getTime) + "";
    users.push(newUser);
    res.json(newUser);
};

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    let index = users.findIndex((usr) => usr._id === userId);
    users.splice(index, 1);
    res.sendStatus(200);
};

const updateUser = (req, res) => {
    const userId = req.params.uid;
    const updates = req.body;
    users = users.map((user) =>
        user._id === userId ? { ...user, ...updates } : user
    );
    res.sendStatus(200);
};

export default UserController;

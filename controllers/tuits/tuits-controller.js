import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
  const newTuit = req.body;
  newTuit._id = new Date().getTime() + "";
  newTuit.topic = "Space";
  newTuit.username = "Stitch";
  newTuit.handle = "@stitchSpaceEnthusiast";
  newTuit.time = "2h";
  newTuit.image = "stitch1.jpg";
  newTuit.title = "Stitch Space Enthusiast";
  newTuit.replies = 0;
  newTuit.retuits = 0;
  newTuit.likes = 0;
  newTuit.liked = false;
  newTuit.dislikes = 0;
  tuits.push(newTuit);
  res.json(newTuit);
};
const findTuits = (req, res) => {
  res.json(tuits);
};
const updateTuit = (req, res) => {
   const tuitdId = req.params.tid;
   const updates = req.body;
   const tuitIndex = tuits.findIndex((t) => t._id === tuitdId);
   tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
   res.sendStatus(200);
};
const deleteTuit = (req, res) => {
  tuits = tuits.filter(tuit => tuit._id !== req.params.tid);
  res.sendStatus(200);
};

export default (app) => {
  app.post("/api/tuits", createTuit);
  app.get("/api/tuits", findTuits);
  app.put("/api/tuits/:tid", updateTuit);
  app.delete("/api/tuits/:tid", deleteTuit);
};

//  controllers are functions, classes, or modules whose only role is to handle HTTP requests and participate in a client/server architecture
const HelloController = (app) => {
  // create endpoint
  app.get("/hello", (req, res) => {
    res.send("Life is good!");
  });
  app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
  });
}

export default HelloController;


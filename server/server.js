const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const app = express();
const server = http.createServer(app);

const filePath = "/db.json";

let router;

// Read the JSON file asynchronously
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Parse the JSON data
  try {
    const jsonData = JSON.parse(data);
    router = jsonServer.router(jsonData);
    // console.log("JSON data:", jsonData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }
});

// response middleware
if (router) {
  router.render = (req, res) => {
    console.log("req: ", { req: req.body.email });
    const email = req?.body?.email;
    const path = req.path;
    const method = req.method;
    console.log("email: method: path ", email, method, path);

    res.json(res.locals.data);
  };
}

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;
app.use(middlewares);

app.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.options("*", cors());

const rules = auth.rewriter({
  users: 640,
  teams: 660,
  projects: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port, () => console.log("listening on port " + port));

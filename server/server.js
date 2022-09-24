const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const router = jsonServer.router("db.json");

// response middleware
router.render = (req, res) => {
  // const path = req.path;
  // const method = req.method;
  res.json(res.locals.data);
};

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

// const rules = auth.rewriter({
//   users: 640,
//   conversations: 660,
//   messages: 660,
// });

// app.use(rules);
app.use(auth);
app.use(router);

server.listen(port, () => console.log("listening on port " + port));

const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const Cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require("./Routers/AuthRouter");
const studentsRouter = require("./Routers/StudentsRouter");
const speakersRouter = require("./Routers/SpeakersRouter");
const AdminRouter = require("./Routers/AdminRouter");

dotenv.config({
  path: "./config.env",
});

const port = process.env.port || 5500;
const database =
  process.env.connectionString || "mongodb://localhost:27017/eventsProject";

// connect on mongoose DB
mongoose
  .connect(database)
  .then(() => {
    console.log("DB connected");
    server.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("DB connection failed");
  });

// logger MW
server.use((request, response, next) => {
  console.log(request.url + " " + request.method);
  next();
});

//body-parser MW
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ extended: true }));

//CORS MW for cross origin allowance
server.use(Cors());

//Routers
server.use(authRouter);
server.use(studentsRouter);
server.use(speakersRouter);
server.use(AdminRouter);

//Not Found MW
server.use((request, response, next) => {
  response.status(404).json({ message: "Page is not found" });
});

//Error MW
server.use((error, request, response, next) => {
  response.status(500).json({ message: error + "" }); // development
  //response.status(404).json("Something went wrong.."); // production
});

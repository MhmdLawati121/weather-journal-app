// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require BodyParser
const bodyParser = require("body-parser");

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/* Routing */
app.get("/viewData", getData);
app.post("/storeData", postData);

/* Functions */
// Function to save data in projectData object
function postData(req, res) {
  console.log("Data Received: ", req.body);
  const newData = {
    temperature: req.body.temperature,
    date: req.body.date,
    response: req.body.response,
  };
  projectData = newData;
  res.json({ status: "success", message: "Data received successfully" });
}

// Function to send projectData object
function getData(req, res) {
  console.log(`Data request received - sending projectData object`);
  res.json(projectData);
}

/*End of functions*/

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log("server running");
  console.log(`running on port ${port}`);
});

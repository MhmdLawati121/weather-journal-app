/* Global Variables */
const API_KEY = "294ac18bd449ca277510d3311f0e6c9a&units=imperial";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let ZIP_CODE;

// Element properties - to be assigned dynamically
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const contentElement = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener
const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", (event) => {
  event.preventDefault();
  ZIP_CODE = document.getElementById("zip").value;
  getWeather()
    .then((data) => postData("/storeData", data))
    .then(() => updateDOM("/viewData"));
});

/* Main Functions */

// Async function to obtain weather data from OpenWeatherMap API
const getWeather = async function () {
  const response = await fetch(BASE_URL + ZIP_CODE + "&appid=" + API_KEY);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Async function to make POST request
const postData = async (url, data) => {
  const newData = {
    temperature: data.main.temp,
    date: newDate,
    response: document.getElementById("feelings").value,
  };
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  try {
    returnedResponse = await response.json();
    return returnedResponse;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

// Async function to update DOM elements dynamically
const updateDOM = async (url) => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    // Update DOM
    dateElement.innerHTML = data.date;
    tempElement.innerHTML = Math.round(data.temperature) + " degrees";
    contentElement.innerHTML = data.response;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

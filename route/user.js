const express = require("express");
const { register, login } = require("../controllers/auth");

const route = express.Router();
route.post("/", register);
route.post("/login", login);

module.exports = route;

// "title":"test",
// "subtitle":"hi there",
// "img":"https://unsplash.com/photos/FLFjAn3gQI8",
// "url":"https://vjs.zencdn.net/v/oceans.mp4"

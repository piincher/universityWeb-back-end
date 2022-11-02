const express = require("express");
const {
  fetchVideos,
  createVideo,
  uploadMedia,
} = require("../controllers/video");
const { admin, requireSignin } = require("../middleware/auth");
const formidable = require("express-formidable");
const route = express.Router();

route.get("/:page", fetchVideos);
route.get("/:id", fetchVideos);
route.post("/", requireSignin, admin, createVideo);
route.post("/uploadVideo", formidable(), uploadMedia);
module.exports = route;

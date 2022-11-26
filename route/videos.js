const express = require("express");
const {
  fetchVideos,
  createVideo,
  uploadMedia,
  fetchVideo,
} = require("../controllers/video");
const { admin, requireSignin } = require("../middleware/auth");
const formidable = require("express-formidable");
const route = express.Router();

route.get("/", fetchVideos);
route.get("/:id", fetchVideo);
route.post("/", requireSignin, admin, createVideo);
route.post("/uploadVideo", formidable(), uploadMedia);
module.exports = route;

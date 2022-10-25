const Video = require("../model/video");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
exports.uploadMedia = async (req, res) => {
  try {
    // console.log(req.body.url);
    // const response = await cloudinary.v2.uploader.upload(req.body.url);
    const response = await cloudinary.uploader.upload(req.body.url, {
      format: "mp4",
    });
    console.log(response);
    res.json({ url: response.secure_url, public_id: response.public_id });
  } catch (error) {
    console.log("ereur cloud", error);
  }
};

exports.fetchVideos = async (req, res) => {
  try {
    const Videos = await Video.find({});

    res.json({ ok: true, Videos });
  } catch (error) {
    console.log("oops! error", error);
  }
};

exports.fetchVideo = async (req, res) => {
  try {
    const Video = await Video.find(req.params.id);

    res.json({ ok: true, Video });
  } catch (error) {
    console.log("oops! error", error);
  }
};

exports.createVideo = async (req, res) => {
  const { title, subtitle, img, url } = req.body;
  console.log("img", img);
  try {
    const post = new Video({
      title,
      subtitle,
      img,
      url,
      postedBy: req.user._id,
    });
    post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
// intensity , likelihood , relevance , end_year , country , topic , region

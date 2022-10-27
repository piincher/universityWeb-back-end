const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    img: {
      // url: String,
      // public_id: String,

      type: String,
      required: true,
    },

    url: {
      // url: String,
      // public_id: String,

      type: String,
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Statistic = mongoose.model("Video", VideoSchema);

module.exports = Statistic;

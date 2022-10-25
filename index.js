const express = require("express");
const { sendEmail } = require("./helpers/sendEmail");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const Videos = require("./route/videos");
const Auth = require("./route/user");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const App = express();

App.use(express.json({ limit: "50mb" }));

App.use(cors());

App.use("/api/v1/user", Auth);
App.use("/api/v1/video", Videos);
App.get("/test", (req, res) => {
  res.send("response from axios");
});
App.post("/send", (req, res) => {
  try {
    const { name, mobileNumber, email, message } = req.body;
    console.log(req.body);
    const emailData = {
      from: "ikouma269@gmail.com",
      to: "info@redpositive.in",
      subject: "Contact Form",
      text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
      html: `
          <h4>Email received from contact form:</h4>
          <p>Sender name: ${name}</p>
          <p>phone number :${mobileNumber}</p>
          <p>Sender email: ${email}</p>
          <p>Sender message: ${message}</p>
          
          <hr />
          <p>This email may contain sensitive information</p>
         
      `,
    };
    sendEmail(req, res, emailData);
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

const PORT = process.env.PORT;
App.listen(PORT, () => {
  console.log(`server is runing in port ${PORT} `);
});

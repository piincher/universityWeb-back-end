require("dotenv").config();
const { createTransport } = require("nodemailer");
exports.sendEmail = async (req, res, data) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  // try {
  //   const response = await transporter.sendMail(data);

  //   res.json(response);
  // } catch (error) {
  //   console.log(`probleme sending email ${error}`);
  // }

  // res.json({});

  return transporter
    .sendMail(data)
    .then((info) => {
      console.log(`message sent ${info.response}`);

      return res.json({
        success: true,
      });
    })
    .catch((error) => console.log(`problem sent email : ${error}`));
};

//xkvlyerenbkelvwb

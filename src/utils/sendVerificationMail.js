const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendEmail = (email, id) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  jwt.sign(
    { user_id: id },
    process.env.EMAIL_SECRET,
    { expiresIn: "1d" },
    function (err, emailToken) {
      if (err)
        throw new Error("something went wrong with assinging jwt to email");

      const mailOptions = {
        from: "manish",
        to: email,
        subject: "Email Verification",
        html: `Press <a href="http://localhost:4000/api/v1/auth/verification/${emailToken}">here</a>`,
      };

      transport.sendMail(mailOptions, function (err, res) {
        if (!err) console.log(res);
        console.log(err);
      });
    }
  );
};

module.exports = sendEmail;

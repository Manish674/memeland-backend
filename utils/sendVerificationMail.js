const nodemailer = require("nodemailer");

const sendEmail = (email, id) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: "manish",
    to: email,
    subject: "Email Verification",
    html: `Press <a href="http://localhost:4000/api/v1/auth/verification/${id}">here</a>`,
  };

  transport.sendMail(mailOptions, function (err, res) {
    if (!err) return console.log("email sent", res);
    console.log(err);
  });
};

module.exports = sendEmail;

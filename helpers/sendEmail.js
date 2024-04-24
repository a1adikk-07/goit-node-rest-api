import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_FROM, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   form: UKR_NET_FROM,
//   to: "xabek72448@em2lab.com",
//   subject: "Test Email",
//   html: "<strong>Test Email</strong>",
// };

// transport
//   .sendMail(transport)
//   .then(() => console.log("email success"))
//   .catch((error) => error.message);

const sendEmail = (data) => {
  const email = { ...data, form: UKR_NET_FROM };
  transport.sendMail(email);
};

export default sendEmail;

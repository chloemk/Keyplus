const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  sendInquiry: async (req, res) => {
    // 1. 문의를 작성한 유저 이메일과 content 를 클라이언트로부터 받아온다.
    // 2. nodemailer 를 사용해서 admin 메일 계정으로 보낸다.
    try {
      const { title, category, email, name, content } = req.body;
      console.log(title, email, content);

      const transporter = nodemailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.MAILID,
          pass: process.env.MAILPW,
        },
      });
      let message = {
        from: process.env.MAILID,
        to: process.env.MAILID,
        subject: title,
        text: content,
        html: `
        <p><b>제목</b>: ${title}</p>
        <p><b>문의 분류</b>: ${category}</p>
        <p><b>작성자 이메일</b>: ${email}</p>
        <p><b>작성자 이름</b>: ${name}</p>
        <p><b>문의 내용</b>: ${content}</p>
        `,
      };
      transporter.sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        }
        res.send({ data: info });
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

import nodemailer from "nodemailer"
import crypto from "crypto"
import { Router } from "express"
import ejs from 'ejs'
const userRouter = Router();

userRouter.post('/mail', (req, res, next) => {
  const { email } = req.body
  const code = crypto.randomBytes(3).toString('hex');
  let emailTemplate;
  ejs.renderFile('./registerVerify.ejs',  //ejs파일 위치 
    { email: email, code: code }, (err, data) => { //ejs mapping
      if (err) { console.log(err) }
      emailTemplate = data;
    });
  let transporter = nodemailer.createTransport({
    service: 'gmail'              //사용하고자 하는 서비스
    , prot: 587
    , host: 'smtp.gmlail.com'
    , secure: false
    , requireTLS: true
    , auth: {
      user: process.env.GOOGLE_SECRET_ID        //gmail주소입력
      , pass: process.env.GOOGLE_SECRET_PSSWORD          //gmail패스워드 입력
    }
  });
  let info = await transporter.sendMail({   
    from: process.env.GOOGLE_SECRET_ID ,             //보내는 주소 입력
    to: email,                        //위에서 선언해준 받는사람 이메일
    subject: '안녕하세요',                  //메일 제목
    text: 'ㅁㄴㅇㄹ',                       //내용
  });
})



import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

const emailCertificate  = async (req, res, next) => {
  const { email, name } = req.body;

  const title = "회원가입 이메일 인증 안내"
  const desc = `${authNum}위 인증번호를 입력해 주세요`

  let authNum = Math.random().toString().substr(2, 6);
  const hashAuth = await bcrypt.hash(authNum, 12);
  console.log(authNum);

  try {
    // 전송하기
    res.cookie('hashAuth', hashAuth, {
      maxAge: 300000
    });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_SECRET_ID,
        pass: process.env.GOOGLE_SECRET_PASSWORD,
      },
    });

    // 보낼 메세지
    let message = {
      from: process.env.GOOGLE_SECRET_ID,
      to: `${name}<${email}>`,
      subject: title,
      html: `<div
      style='
      text-align: center; 
      width: 50%; 
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      '>
      <h2>${name} 님, 안녕하세요.</h2> <br/> <h2>제목: ${title}</h2> <br/>${desc} <br/><br/><br/><br/></div>`,
    };
    
    // 메일이 보내진 후의 콜백 함수
    transporter.sendMail(message, (err) => {
      if (err) next(err);
      else res.status(200).json({ isMailSucssessed: true });
    });
  } catch (err) {
    next(err);
  }
};

const emailConfirm = async (req, res, next) => {
  const CEA = req.body.CEA;
  const hashAuth = req.cookies.hashAuth;
  
  try {
    if(bcrypt.compareSync(CEA, hashAuth)) {
      res.send({ result : 'success' });
    }
    else {
      res.send({ result : 'fail' });
    }
  } catch(err) {
    res.send({ result : 'fail' });
    console.error(err);
    next(err);
  }
};

export {emailCertificate}
export {emailConfirm}
export function ValidateData(data, confirmPassword, checked) {
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassowrd = (password) => {
    return password.match(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    );
  };
  const validateName = (name) => {
    return name.match(/^[가-힣a-zA-Z]+$/) && name.length >= 2;
  };
  const validatePhone = (phone) => {
    return phone.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/);
  };

  const isEmailValid = validateEmail(data.email);
  const isPasswordValid = validatePassowrd(data.password);
  const isPasswordSame = data.password === confirmPassword;
  const isNameValid = validateName(data.name);
  const isUserIdValid = data.userId.length >= 2;
  const isGenderValid = data.gender !== null;
  const isPhoneValid = validatePhone(data.phone);
  const isBirthValid = data.birth !== "";

  const result =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isUserIdValid &&
    isGenderValid &&
    isPhoneValid &&
    isBirthValid &&
    checked;

  const message = {
    emailError: "",
    passwordError: "",
    passwordNotSameError: "",
    nameError: "",
    userIdError: "",
    genderError: "",
    phoneError: "",
    birthError: "",
    checkError: "",
  };

  if (!isEmailValid) message.emailError = "올바른 이메일 형식이 아닙니다.";
  if (!isPasswordValid)
    message.passwordError =
      "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.";
  if (!isPasswordSame)
    message.passwordNotSameError = "비밀번호가 일치하지 않습니다.";
  if (!isNameValid) message.nameError = "올바른 이름을 입력해주세요.";
  if (!isUserIdValid) message.userIdError = "닉네임은 두글자 이상이여야합니다.";
  if (!isGenderValid) message.genderError = "성별을 입력해주세요";
  if (!isPhoneValid)
    message.phoneError = "하이픈이 포함된 올바른 번호를 입력해주세요.";
  if (!isBirthValid) message.birthError = "생일을 입력해주세요.";
  if (!checked) message.checkError = "약관에 동의해주세요.";

  return [result, message];
}

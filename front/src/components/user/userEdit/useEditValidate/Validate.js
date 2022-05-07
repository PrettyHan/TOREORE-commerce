export function Validate(data) {
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validateName = (name) => {
        return name.match(/^[가-힣a-zA-Z]+$/) && name.length >= 2;
    };
    const validatePhone = (phone) => {
        return phone.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/);
    };
    const validateBirth = (birth) => {
        return birth.match(/^[0-9]{4}[-]+[0-9]{2}[-]+[0-9]{2}$/);
    };

    const isEmailValid = validateEmail(data.email);
    const isNameValid = validateName(data.name);
    const isUserIdValid = data.userId.length >= 2;
    const isGenderValid = data.gender !== null;
    const isPhoneValid = validatePhone(data.phone);
    const isBirthValid = validateBirth(data.birth);

    const result =
        isEmailValid &&
        isNameValid &&
        isUserIdValid &&
        isGenderValid &&
        isPhoneValid &&
        isBirthValid;

    const message = {
        emailError: "",
        nameError: "",
        userIdError: "",
        genderError: "",
        phoneError: "",
        birthError: "",
    };

    if (!isEmailValid) message.emailError = "올바른 이메일 형식이 아닙니다.";
    if (!isNameValid) message.nameError = "올바른 이름을 입력해주세요.";
    if (!isUserIdValid)
        message.userIdError = "아이디는 두글자 이상이여야합니다.";
    if (!isGenderValid) message.genderError = "성별을 입력해주세요";
    if (!isPhoneValid)
        message.phoneError = "하이픈이 포함된 올바른 번호를 입력해주세요.";
    if (!isBirthValid) message.birthError = "올바른 생년월일을 입력해주세요.";

    return [result, message];
}

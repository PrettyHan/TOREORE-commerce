export function SocialValidate(data) {
    const validateName = (name) => {
        return name.match(/^[가-힣a-zA-Z]+$/) && name.length >= 2;
    };
    const validatePhone = (phone) => {
        return phone.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/);
    };
    const validateBirth = (birth) => {
        return birth.match(/^[0-9]{4}[-]+[0-9]{2}[-]+[0-9]{2}$/);
    };

    const isNameValid = validateName(data.name);
    const isGenderValid = data.gender !== null;
    const isPhoneValid = validatePhone(data.phone);
    const isBirthValid = validateBirth(data.birth);

    const result = isNameValid && isGenderValid && isPhoneValid && isBirthValid;

    const message = {
        nameError: "",
        genderError: "",
        phoneError: "",
        birthError: "",
    };

    if (!isNameValid) message.nameError = "올바른 이름을 입력해주세요.";
    if (!isGenderValid) message.genderError = "성별을 입력해주세요";
    if (!isPhoneValid)
        message.phoneError = "하이픈이 포함된 올바른 번호를 입력해주세요.";
    if (!isBirthValid) message.birthError = "올바른 생년월일을 입력해주세요.";

    return [result, message];
}

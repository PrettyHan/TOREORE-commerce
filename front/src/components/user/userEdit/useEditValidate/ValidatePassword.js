export function ValidatePassword(data, confirmPassword) {
    const validatePassword = (password) => {
        return password.match(
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        );
    };

    const isPasswordValid = validatePassword(data.password);
    const isPasswordSame = data.password === confirmPassword;

    const result = isPasswordValid && isPasswordSame;

    const message = {
        passwordError: "",
        passwordNotSameError: "",
    };

    if (!isPasswordValid)
        message.passwordError =
            "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.";
    if (!isPasswordSame)
        message.passwordNotSameError = "비밀번호가 일치하지 않습니다.";

    return [result, message];
}

import otpgenerator from "otp-generator";

export const generateOTP = () => {
    return otpgenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    }
    )
}


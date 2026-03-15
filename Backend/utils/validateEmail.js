import isEmail from "validator/lib/isEmail.js";

export const isValidEmail = (email) => {
    return isEmail(email);
}
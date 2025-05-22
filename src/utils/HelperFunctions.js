import { REGEX_EMAIL } from "./Constants";

export const validateEmail = (email) => REGEX_EMAIL.test(email);

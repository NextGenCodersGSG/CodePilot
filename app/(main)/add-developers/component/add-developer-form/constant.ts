import { Role } from "@/@types/index";
import { FormValues } from "./type.js";

export const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: Role.Developer,
};



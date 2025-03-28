import { Role } from "@/@types/index";
import { FormValues } from "./types";

export const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: Role.User,
};



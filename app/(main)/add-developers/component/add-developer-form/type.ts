import { IUser } from "@/@types";

export interface FormValues extends IUser {
    confirmPassword: string;
}
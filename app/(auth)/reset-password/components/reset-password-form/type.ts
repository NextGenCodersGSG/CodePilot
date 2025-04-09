import { IUser } from "@/@types";

export interface FormValues extends Pick<IUser, 'password'> {
    confirmPassword: string;
}
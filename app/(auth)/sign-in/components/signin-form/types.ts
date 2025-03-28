import { IUser } from "@/@types";

export interface FormValues extends Pick<IUser, 'email' | 'password'> {}

import "server-only";
import { cookies } from "next/headers";
import {  UserRoles } from "../@types/index";
import { generateToken,  TokenPayload,  verifyToken } from "./generateAndVerifyToken";
import { ObjectId } from "mongoose";

export async function createToken(userId: string | ObjectId, name:string, email: string, userRole: UserRoles, plan: string):Promise<string> {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const stringUserId = userId.toString();
    const token = await generateToken({ userId: stringUserId, name, email, userRole, plan });

    (await cookies()).set("auth-token", token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
    return token;
}

export async function getToken(): Promise<TokenPayload | undefined | null > {
    const token = (await cookies()).get("auth-token")?.value;

    if(!token) return undefined;
    const payload =await verifyToken(token);
    return payload;
}

export async function deleteToken() {
    (await cookies()).delete("auth-token");
}

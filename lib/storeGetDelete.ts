import "server-only";
import { cookies } from "next/headers";
import {  UserRoles } from "../@types/index";
import { generateToken,  TokenPayload,  verifyToken } from "./generateAndVerifyToken";

export async function createToken(userId: string, userRole: UserRoles):Promise<string> {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const token = await generateToken({ userId, userRole });

    (await cookies()).set("auth-token", token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
    return token;
}

export async function getToken(): Promise<TokenPayload | undefined | null > {
    const token = (await cookies()).get("auth-token")?.value;
    console.log("getToken",token);

    if(!token) return undefined;
    const payload =await verifyToken(token);
    console.log("verifyToken",payload);
    return payload;
}

export async function deleteToken() {
    (await cookies()).delete("auth-token");
}

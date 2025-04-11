import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { JwtPayload } from "jsonwebtoken";
import { UserRoles } from "@/@types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
interface TokenPayload extends JwtPayload {
  userId: string;
  userRole?: UserRoles;
}

export async function generateToken(
  payload: TokenPayload,
  expirationTime: string = "1d"
): Promise<string> {
  console.log("payload", payload);
  const t = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime);

  const token = await t.sign(encodedKey);
  console.log("token func", token);
  return token;
}

export async function verifyToken(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

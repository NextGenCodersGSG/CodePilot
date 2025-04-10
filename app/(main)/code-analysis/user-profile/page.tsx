import { cookies } from "next/headers";
import ProfilePage from "./components/profile";
import { verifyToken } from "@/lib/generateAndVerifyToken";
import { IUserData } from "./components/types";


export default async function Page() {
    const token = (await cookies()).get("auth-token");
    const user = await verifyToken(token?.value) as IUserData;
    console.log(user);
    
    return <ProfilePage {...user} />
}

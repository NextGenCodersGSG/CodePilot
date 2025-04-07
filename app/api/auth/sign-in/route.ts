import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { ILogin } from "@/@types/index";
import { connection } from "@/DB/connection";
<<<<<<< HEAD

=======
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a

export async function POST(req: NextRequest) {
  await connection();
  try {
    const data: ILogin = await req.json();
    if (!data) {
      return NextResponse.json({ error: "Data is required" }, { status: 400 });
    }
    const { token, user } = await AuthService.signIn(data);
    const role: string = user.role
    console.log("token", token);
    return NextResponse.json(
      {
        message: "User login successfully",
        token,
        role
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

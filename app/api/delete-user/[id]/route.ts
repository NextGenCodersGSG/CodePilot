import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connection } from '@/DB/connection';
import userModel from '@/DB/models/user.model';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const userIdString = params.id; // Extracting the user ID from route parameters

    let userId: ObjectId;
    try {
        userId = new ObjectId(userIdString); 
    } catch (error) {
        console.log("Invalid Object ID format");
        return NextResponse.json({ message: "Invalid User ID format" }, { status: 400 });
    }

    console.log("Attempting to delete user with ID:", userId);

    try {
        await connection(); 

        const userToDelete = await userModel.findById(userId);
        if (!userToDelete) {
            console.log("User not found with ID:", userId);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const deletedUser = await userModel.findByIdAndDelete(userId);
        console.log("Deleted user:", deletedUser);

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);

        // Use type checking to handle the error
        if (error instanceof Error) {
            // Handle any known error type
            return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
        } else {
            // Handle unknown error type
            return NextResponse.json({ error: 'Internal Server Error', details: 'An unknown error occurred.' }, { status: 500 });
        }
    }
}
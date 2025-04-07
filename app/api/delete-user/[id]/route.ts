import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connection } from '@/DB/connection';
import userModel from '@/DB/models/user.model';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Validate ID parameter
        if (!params.id || typeof params.id !== 'string') {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }

        let userId: ObjectId;
        try {
            userId = new ObjectId(params.id);
        } catch (error) {
            return NextResponse.json({ message: "Invalid User ID format" }, { status: 400 });
        }

        await connection();

        // Find and delete in one operation
        const deletedUser = await userModel.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "User deleted successfully",
            deletedId: deletedUser._id.toString()
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { 
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
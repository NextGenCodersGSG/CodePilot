
import { connection } from '@/DB/connection';
import userService from '@/module/services/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    await connection();
  try {
    const body = await request.json();
    const userId = body.userId;
    console.log("userId is: ", userId);
    
    // Validate presence
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }


    // Execute deletion
    const deletedId = await userService.deleteUser(userId);
    console.log(deletedId);
    
    return NextResponse.json(
      { 
        message: 'User deleted successfully',
        deletedId
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle specific errors
    if (error.message === 'Invalid user ID') {
        console.log("from the endpoint", error);
          
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (error.message === 'User not found') {
      console.log(error);
      
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generic error handling
    console.error('Deletion error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
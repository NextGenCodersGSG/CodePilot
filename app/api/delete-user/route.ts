
import { connection } from '@/DB/connection';
import countLogsService from '@/module/services/countLogs.service';
import userService from '@/module/services/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    await connection();
  try {
    const body = await request.json();
    const userId = body.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const deletedId = await userService.deleteUser(userId);
    await countLogsService.deleteUserFromLogs(userId);
    
    return NextResponse.json(
      { 
        message: 'User deleted successfully',
        deletedId
      },
      { status: 200 }
    );
  } catch (error: any) {

    if (error.message === 'Invalid user ID') {
          
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (error.message === 'User not found') {
      
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

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
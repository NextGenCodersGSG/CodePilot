"use client";
import React, { useEffect } from 'react'
import { getUserId } from '../utils/getUserId';

const page = () => {
    useEffect(() => {
        const fetchUserMeetings = async () => {
            const userId =  await getUserId();
            const response = await fetch(`/api/all-user-meetings?userId=${userId}`);
            const meetings = await response.json();
            console.log(meetings);
        }
        fetchUserMeetings();
    }, []);

  return (
    <div>
      {/* Your code goes here */}
    </div>
  )
}

export default page

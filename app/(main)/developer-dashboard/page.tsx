"use client";
import React, { useEffect } from 'react'
import { getUserId } from '../code-analysis/utils/getUserId';

const page = () => {

  useEffect(() => {
    const fetchDeveloperMeetings = async () => {
      const userId = await getUserId();
      console.log("userId: ", userId);
      const response = fetch(`/api/meetings/all-meetings`);
      const wrapper = (await response).json();
      const data = (await wrapper);
      console.log(data.meetings);

    }

    fetchDeveloperMeetings();
  },[])
  return (
    <div>
      {/* Your code goes here: */}
    </div>
  )
}

export default page

"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'react-toastify';
import { ThumbsUp, ThumbsDown, ChevronRight, Share2 } from "lucide-react";
import StreamView from '../components/StreamView';
import { useSession } from 'next-auth/react';


interface Video{
  "id": string,
  "type": string,
  "url": string,
  "extractedId": string,
  "title": string,
  "smallImg": string,
  "bigImg": string,
  "active": boolean,
  "userId": string,
  "upvotes": number,
  "haveUpvoted": boolean



}
// Mock data for the queue


export default function SongVotingQueue() {
  //check the creatorId
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return <div>Unable to load user data</div>
  }
  console.log(session)
  console.log(session.user)
  return <StreamView creatorId={session.user.id} playVideo={true} />
}
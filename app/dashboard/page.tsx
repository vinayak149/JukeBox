"use client";
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'react-toastify';
import { ThumbsUp, ThumbsDown, ChevronRight, Share2 } from "lucide-react";
import StreamView from '../components/StreamView';


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
  return <StreamView creatorId={user.id} playVideo={true} />
}
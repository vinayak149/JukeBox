"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'react-toastify';
import { ThumbsUp, ThumbsDown, ChevronRight, Share2 } from "lucide-react";
//@ts-ignore
import YouTubePlayer from 'youtube-player';


interface Video {
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


export default function StreamView({
  creatorId,
  playVideo = false
}: {
  creatorId: string,
  playVideo?: boolean
}) {
  const [queue, setQueue] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [newLink, setNewLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [playNextLoader, setPlayNextLoader] = useState(false)
  const videoPlayerRef = useRef<HTMLDivElement>();
  const REFRESH_INTERVAL_MS = 10 * 1000

  if (!creatorId) {
    console.log("creatorId required")
  }

  async function refreshStreams() {
    const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
      credentials: "include"
    });
    const text = await res.text()
    console.log("res console__________" + text);
    const json = await res.json()
    setQueue(json.streams.sort((a: any, b: any) => a.upvotes < b.upvotes ? -1 : 1))
    setCurrentVideo(video => {
      if (video?.id === json.activeStream?.stream?.id) {
        return video
      }
      return json.activeStream?.stream || null
    })

    console.log(res);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {
      refreshStreams();
    }, REFRESH_INTERVAL_MS)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/streams", {
      method: "POST",
      body: JSON.stringify({
        creatorId: "7bca0a73-a1db-49c7-91b2-ecbce04e2b8e",
        url: newLink,
      })
    });

    setQueue([...queue, await res.json()])
    setLoading(false);
    setNewLink('')
    console.log("Submitted link:", newLink);


  };

  useEffect(() => {
    if (!videoPlayerRef.current) {
      return;
    }
    let player = YouTubePlayer(videoPlayerRef.current);


    player.loadVideoById(currentVideo?.extractedId);


    player.playVideo();
    function eventHandler(event: any) {
      if (event.data === 0) {
        playNext();
      }
    }


    player.on('stateChange', eventHandler);

    return () => {

      player.destroy();
    }
  }, [currentVideo, videoPlayerRef])

  const handleVote = (id: string, isUpvote: boolean) => {
    setQueue(queue.map(video =>
      video.id === id ? {
        ...video,
        upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
        haveUpvoted: !video.haveUpvoted
      } : video
    ).sort((a, b) => b.upvotes - a.upvotes))

    fetch(`/api/streams/${isUpvote ? "upvote" : "downvote"}`, {
      method: "POST",
      body: JSON.stringify({
        streamId: id
      })
    })
  }


  const playNext = async () => {
    if (queue.length > 0) {
      try {
        setPlayNextLoader(true)
        const data = await fetch('/api/streams/next', {
          method: "GET",
        })
        const json = await data.json()
        setCurrentVideo(json.stream)
        setQueue(q => q.filter(x => x.id !== json.stream?.id))
      } catch (e) {
        console.error("Failed to play next video:", e)
      }
      setPlayNextLoader(false)

    }
  }

  const handleShare = async () => {
    // Here you would typically implement the sharing functionality
    const shareableLink = `${window.location.hostname}/creator/${creatorId}`
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success('Link copied to clipboard!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error('Failed to copy link.');
    }
    // For now, we'll just log a message
    console.log("Sharing the queue with fans!")
  }

  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-purple-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-4 space-y-6 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-teal-300">Song Voting Queue</h1>
          <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700">
            <Share2 className="h-4 w-4 mr-2" />
            Share with Fans
          </Button>
        </div>

        {/* Current video player with next button */}
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            {currentVideo ? (
              playVideo ? (
                // @ts-ignore
                <div ref={videoPlayerRef} ></div>
                // <iframe
                //   className="w-full h-full"
                //   src={`https://www.youtube.com/embed/${currentVideo.extractedId}?autoplay=1&mute=1`}
                //   title="YouTube video player"
                //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                //   allowFullScreen
                // ></iframe>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">Video player disabled</p>
                </div>
              )
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">No video selected</p>
              </div>
            )}
            {playVideo && <Button
              disabled={playNextLoader || queue.length === 0}
              onClick={playNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>}
          </div>

          {/* Submit new song form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="text"
              placeholder="Enter YouTube link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
            />
            <Button disabled={loading} onClick={handleSubmit} type="submit" className="w-full bg-purple-600 hover:bg-purple-700">{loading ? "Loading..." : "Add to Queue"}</Button>
          </form>

          {/* Queue */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-teal-300">Upcoming Songs</h2>
            {queue.map((video) => (
              <Card key={video.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
                <CardContent className="p-4 flex items-center space-x-4">
                  <img src={video.smallImg} alt={video.title} className="w-32 h-18 object-cover rounded" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-teal-300">{video.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleVote(video.id, video.haveUpvoted ? false : true)}
                      className="flex videos-center space-x-1 text-teal-300 hover:text-teal-400 hover:bg-gray-700"
                    >
                      {video.haveUpvoted ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                      <span>{video.upvotes}</span>
                    </Button>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

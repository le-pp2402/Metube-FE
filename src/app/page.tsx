"use client"

import { useEffect, useState } from "react";
import getVideos from "./api/videos/get-videos";
import { Video } from "@/types/video";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoCard from "@/components/watch/VideoCard";


const mockVideos: Video[] = [
  {
    id: "v1",
    title: "15th Anniversary HD Remaster - Watch Now!",
    uploader: "Official Channel",
    createdAt: "6 hours ago",
    thumbnail: "https://picsum.photos/seed/v1/800/450",
    likes: 100,
    views: 781,
  },
  {
    id: "v2",
    title: "Top 10 Magical Moments - Fan Favorites",
    views: 1200,
    uploader: "PonyFanatic",
    createdAt: "12 hours ago",
    thumbnail: "https://picsum.photos/seed/v2/800/450",
    likes: 200,
  },
  {
    id: "v3",
    title: "Behind the Scenes - Voice Actor Interview",
    views: 892,
    uploader: "BronyMedia",
    createdAt: "1 day ago",
    thumbnail: "https://picsum.photos/seed/v3/800/450",
    likes: 300,
  },
  {
    id: "v4",
    title: "Season 1 Episode 1 - The Magic Begins",
    views: 2100,
    uploader: "ClassicPony",
    createdAt: "2 days ago",
    thumbnail: "https://picsum.photos/seed/v4/800/450",
    likes: 400,
  },
  {
    id: "v5",
    title: "Music Video - Friendship is Magic Theme Remix",
    views: 1500,
    uploader: "PonyBeats",
    createdAt: "3 days ago",
    thumbnail: "https://picsum.photos/seed/v5/800/450",
    likes: 500,
  },
  {
    id: "v6",
    title: "Fan Animation - Rainbow Dash's Adventure",
    views: 945,
    uploader: "AnimatorPro",
    createdAt: "4 days ago",
    thumbnail: "https://picsum.photos/seed/v6/800/450",
    likes: 600,
  },
];

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();

      console.log("FILE[page.tsx] | data");
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[#f8f8f8] min-h-screen p-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video, idx) => (
              <VideoCard key={video.id} video={video} idx={idx} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

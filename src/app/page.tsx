"use client"
import Link from "next/link";

import { useEffect, useState } from "react";
import { getVideos } from "@/utils/videoApi";
import { Card } from "@/components/ui/card";


export default function Home() {
  const [videos, setVideos] = useState<{ id: string; title: string; description: string }[]>([]);

  useEffect(
    () => {
      getVideos()
        .then((res) => {
          setVideos(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    , []
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Link href={`/watch?id=` + video.id} className="flex items-center gap-2" key={video.id}>
          <Card key={video.id} className="cursor-pointer hover:cursor-pointer">
            <div className="aspect-w-16 aspect-h-9 max-w-full max-h-48 overflow-hidden">
              <img src="/thumbnail.jpg" alt={video.title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold truncate">{video.title}</h2>
              <p className="text-xs text-gray-400">Uploaded by: Default User</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

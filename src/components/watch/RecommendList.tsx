"use client";
import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import getVideos from "@/app/api/videos/get-videos";
import { Video } from "@/types/video";
import VideoCard from "./VideoCard";

export default function RecommendList() {

    const [videos, setVideos] = useState<Video[]>();

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await getVideos();

            console.log("FILE[page.tsx] | data");
            setVideos(data);
        };
        fetchVideos();
    }, []);

    return (
        <div className="flex flex-col">
            {videos && videos.length > 0 ? (
                videos.map((video, idx) => (
                    <div className="mb-4" key={video.id}>
                        <VideoCard key={video.id} video={video} idx={1} />
                    </div>
                ))
            ) : (
                <p>No recommended videos available.</p>
            )}
        </div>
    )
}
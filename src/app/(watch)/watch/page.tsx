"use client";

import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/watch/VideoPlayer";
import RecommendList from "@/components/watch/RecommendList";
import DescriptionVideoCard from "@/components/watch/DescriptionVideoCard";
import { useSearchParams } from "next/navigation";

export default function WatchPage() {
    const searchParams = useSearchParams();
    const [videoId, setVideoId] = useState<number | null>(null);

    useEffect(() => {
        const idParam = searchParams.get("id");
        if (!idParam) return;

        const idNum = Number(idParam);
        if (!Number.isNaN(idNum)) {
            setVideoId(idNum);
        }
    }, [searchParams]);

    if (videoId === null) {
        return <div className="text-white p-4">Loading video…</div>;
    }

    return (
        <main className="flex flex-1 overflow-hidden text-white">
            <div className="basis-2/3 p-4 space-y-4">
                <div className="rounded-lg overflow-hidden mb-4">
                    <VideoPlayer idVideo={videoId} />
                </div>
                <div className="p-6 rounded-xl bg-white shadow-md border border-blue-200">
                    <DescriptionVideoCard id={videoId} />
                </div>
            </div>
            <aside className="basis-1/3 p-4 overflow-y-auto space-y-4">
                <RecommendList />
            </aside>
        </main>
    );
}

"use client"
import React, { experimental_useEffectEvent, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import VideoPlayer from '@/components/watch/VideoPlayer'; // Import VideoPlayer component
import Comments from '@/components/watch/Comments'; // Import Comments component
import RecommendList from '@/components/watch/RecommendList';


export default function Watch() {
    const [id, setId] = useState(0);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        try {
            console.log(urlParams.get('id'));
            if (urlParams.has('id')) {
                const id = parseInt(urlParams.get('id') ?? '0');
                setId(id);
                console.log(id);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <main className="flex flex-1 overflow-hidden text-white">
            {/* Video Player and Comments Section */}
            <div className="flex-1 p-4 space-y-4">
                {/* Video Player */}
                <div className="rounded-lg overflow-hidden mb-4">
                    <VideoPlayer idVideo={id} />
                </div>

                {/* Comments Section */}
                <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <Comments />
                </div>
            </div>

            {/* Recommended Videos Sidebar */}
            <aside className="w-80 p-4 overflow-y-auto space-y-4">
                <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
                <RecommendList />
            </aside>
        </main>
    );
}
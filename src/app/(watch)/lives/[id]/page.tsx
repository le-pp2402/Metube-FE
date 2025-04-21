import React from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import { getLive } from '@/utils/liveSessionApi';
import LiveChat from '@/components/LiveChat';

interface PageProps {
    params: {
        id: number;
    };
}

type LiveSession = {
    id: number;
    username: string;
    title: string;
    viewCount: number;
    path: string;
};

// This is now a server component
export default async function LivePage({ params }: PageProps) {
    const { id } = await params;

    let liveSession: LiveSession | null = null;

    try {
        const res = await getLive(Number(id));
        liveSession = res?.data?.data || null;
    } catch (error) {
        console.error("Error fetching live session:", error);
    }

    if (!liveSession) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No live session found.</p>
            </div>
        );
    }

    return (
        <main className="flex flex-1 h-screen bg-white text-gray-900">
            {/* Left side: Video */}
            <div className="flex-1 p-6 overflow-hidden">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <MediaPlayer title={liveSession.title} src={`http://localhost:81/hls/${liveSession.path}`}>
                        <MediaProvider />
                        <DefaultVideoLayout
                            thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                            icons={defaultLayoutIcons}
                        />
                    </MediaPlayer>
                </div>
            </div>

            {/* Right side: Chat */}
            <aside className="w-[400px] max-w-full flex flex-col border-l border-gray-200 bg-gray-50">
                <div className="flex-1 overflow-y-auto p-4">
                    <LiveChat channelId={liveSession.id} />
                </div>
            </aside>
        </main>
    );
}

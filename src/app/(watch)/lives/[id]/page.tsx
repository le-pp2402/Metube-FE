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
        <main className="flex flex-1 h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
            {/* Left side: Video */}
            <div className="flex-1 p-8 overflow-hidden">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/80">
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
            <aside className="w-[400px] max-w-full flex flex-col border-l border-gray-200/50 bg-white/90 backdrop-blur-sm">
                <div className="p-4 border-b border-gray-200/50">
                    <h2 className="text-lg font-semibold text-gray-800">Live Chat</h2>
                    <p className="text-sm text-gray-500">Join the conversation</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <LiveChat channelId={liveSession.id} />
                </div>
            </aside>
        </main>
    );
}

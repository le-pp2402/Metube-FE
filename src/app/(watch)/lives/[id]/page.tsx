"use client";

import React, { useEffect, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import LiveChat from "@/components/LiveChat";
import { useParams } from "next/navigation";

type LiveSession = {
    id: number;
    username: string;
    title: string;
    viewCount: number;
    path: string;
};


export default function LivePage() {

    const { id } = useParams();
    const [liveSession, setLiveSession] = useState<LiveSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [streamUrl, setStreamUrl] = useState<string>("");

    const NEXT_PUBLIC_LIVE_API_URL = process.env.NEXT_PUBLIC_LIVE_API_URL;
    const PUB_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    useEffect(() => {
        async function fetchLiveSession() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${PUB_BACKEND_API_URL}/live-session/${id}`);


                const liveSS = await response.json();
                console.log("livess", liveSS);
                if (!liveSS) {
                    setError("No live session data found");
                }

                setLiveSession(liveSS.data);
                setStreamUrl(`${NEXT_PUBLIC_LIVE_API_URL}hls/${liveSS.data.path}`);
            } catch (error: any) {
                console.error("Error fetching live session:", error);
                if (error.code === "ERR_NETWORK") {
                    setError("Cannot connect to the server.");
                } else if (error.response?.status === 404) {
                    setError("Live session not found.");
                } else if (error.response?.status >= 500) {
                    setError("Server error. Please try again later.");
                } else {
                    setError("Failed to load live session.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchLiveSession();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading live session...</p>
                </div>
            </div>
        );
    }

    if (error || !liveSession) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {error ? "Connection Error" : "Not Found"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {error || "No live session found."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="flex flex-1 h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
            {/* Left side: Video */}
            <div className="flex-1 p-8 overflow-hidden">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/80">
                    <MediaPlayer title={liveSession.title} src={streamUrl}>
                        <MediaProvider />
                        <DefaultVideoLayout
                            thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                            icons={defaultLayoutIcons}
                        />
                    </MediaPlayer>
                </div>

                {/* Video Info */}
                <div className="mt-4 p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                    <h1 className="text-xl font-bold text-gray-800">
                        {liveSession.title}
                    </h1>
                    <p className="text-gray-600">by {liveSession.username}</p>
                    <p className="text-sm text-gray-500">
                        {liveSession.viewCount} viewers
                    </p>
                </div>
            </div>

            {/* Right side: Chat */}
            <aside className="w-[400px] max-w-full flex flex-col border-l border-gray-200/50 bg-white/90 backdrop-blur-sm">
                <div className="p-4 border-b border-gray-200/50">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Live Chat
                    </h2>
                    <p className="text-sm text-gray-500">
                        Join the conversation
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <LiveChat channelId={liveSession.id} />
                </div>
            </aside>
        </main>
    );
}

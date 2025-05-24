'use client';

import { SubtitleStatusCard } from '@/components/workspace/SubtitleStatusCard';
import { VideoStatusCard } from '@/components/workspace/VideoStatusCard';
import { useAuth } from '@/context/AuthContext';

export function WorkspacePage() {
    const { user } = useAuth();

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <VideoStatusCard />
                <SubtitleStatusCard />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Available Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Live Stream</span>
                        </div>
                        <p className="text-sm text-gray-600 pl-7">Setup and manage your live streaming channel</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="font-medium">Content</span>
                        </div>
                        <p className="text-sm text-gray-600 pl-7">Upload videos, manage content, and generate subtitles</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-purple-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-medium">Analytics</span>
                        </div>
                        <p className="text-sm text-gray-600 pl-7">Track performance and audience engagement</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 
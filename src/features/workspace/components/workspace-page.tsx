'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoStatusCard } from '@/components/workspace/VideoStatusCard';

export function WorkspacePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Dashboard</h1>

            <VideoStatusCard />

            <Card className="w-1/2 mt-8">
                <CardHeader>
                    <CardTitle>Available Features</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-lg p-6 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <h3 className="font-semibold text-gray-900">Live Stream</h3>
                        </div>
                        <p className="text-gray-600">Setup and manage your live streaming channel</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <h3 className="font-semibold text-gray-900">Content</h3>
                        </div>
                        <p className="text-gray-600">Upload videos, manage content</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="font-semibold text-gray-900">Ad Management</h3>
                        </div>
                        <p className="text-gray-600">Insert video advertisements</p>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
} 
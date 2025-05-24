"use client";

import React, { useState, useEffect } from "react";
import { Copy, Eye, Heart, MessageSquare, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { createSteamKey } from "@/app/api/live/create-stream-key";
import { getUserInfo } from "@/features/workspace/api/workspace";
import LiveVideoPlayer from "@/components/workspace/livestream/LiveVideoPlayer";
import { startLiveSession, stopLiveSession } from "@/app/api/live/live-session";

export default function LivestreamPage() {
    const [streamKey, setStreamKey] = useState("");
    const [title, setTitle] = useState("");
    const [viewCount] = useState(0);
    const [likeCount] = useState(0);
    const [isLive, setIsLive] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [videoUrl, setVideoUrl] = useState("");
    const [justCopied, setJustCopied] = useState(false);

    const handleGenerateKey = async () => {
        const newKey = await createSteamKey();
        setStreamKey(newKey);
        toast.success("Stream key generated successfully, DON'T SHARE IT WITH ANYONE");
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(streamKey);
            setJustCopied(true);
            toast.success("Stream key copied to clipboard");
            setTimeout(() => setJustCopied(false), 2000);
        } catch {
            toast.error("Failed to copy stream key");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = (await getUserInfo()).user;
            console.log("[workspace/livestream/page.tsx] data,", data);
            setVideoUrl(data?.username ? `hls/${data.username}.m3u8` : "");
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const manageLiveSession = async () => {
            if (isLive) {
                await startLiveSession({ title: title ?? "live" });
            } else {
                await stopLiveSession();
            }
        };
        manageLiveSession();
    }, [isLive]);

    return (
        <div className="flex flex-col gap-3 p-1">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Livestream</h1>
                <Badge
                    variant={isLive ? "default" : "secondary"}
                    className={`text-sm ${isLive ? "bg-green-600 text-white" : ""}`}>
                    <Radio className={`h-4 w-4 mr-1 ${isLive ? "text-white animate-pulse" : ""}`} />
                    {isLive ? "LIVE" : "OFFLINE"}
                </Badge>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Video & Stats */}
                <div className="col-span-8 space-y-6">

                    <div className="rounded-lg overflow-hidden mb-4">
                        <LiveVideoPlayer videoUrl={videoUrl} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Eye, label: "Views", count: viewCount, color: "blue" },
                            { icon: Heart, label: "Likes", count: likeCount, color: "purple" },
                            { icon: MessageSquare, label: "Comments", count: messages.length, color: "green" },
                        ].map(({ icon: Icon, label, count, color }) => (
                            <Card key={label}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 bg-${color}-100 rounded-full`}>
                                            <Icon className={`h-5 w-5 text-${color}-600`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-600">{label}</p>
                                            <p className="text-xl font-semibold">{count}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Settings & Chat */}
                <div className="col-span-4 space-y-6">
                    {/* Stream Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Stream Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="stream-title">Stream Title *</Label>
                                <Input
                                    id="stream-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter stream title..."
                                    className="border-slate-200"
                                    required
                                />
                            </div>

                            {/* Stream Key */}
                            <div className="space-y-2">
                                <Label>Stream Key</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={streamKey}
                                        readOnly
                                        type="password"
                                        className="flex-1 font-mono border-slate-200 disabled:opacity-100 disabled:font-semibold"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={handleCopy}
                                        aria-label="Copy stream key"
                                    >
                                        <Copy className={`h-5 w-5 ${justCopied ? 'text-green-500' : 'text-gray-500'}`} />
                                    </Button>
                                    <Button onClick={handleGenerateKey} variant="outline">
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            {/* Live Toggle */}
                            <Button
                                onClick={() => setIsLive(!isLive)}
                                className="w-full"
                                variant={isLive ? "destructive" : "default"}
                            >
                                {isLive ? "End Stream" : "Start Stream"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Live Chat */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Live Chat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="h-[300px] bg-slate-50 rounded-lg p-4 overflow-y-auto scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                ref={(el) => {
                                    if (el) el.scrollTop = el.scrollHeight;
                                }}
                            >
                                {messages.length === 0 ? (
                                    <p className="text-center text-slate-500 text-sm">No messages yet</p>
                                ) : (
                                    <div className="space-y-2">
                                        {messages.map((msg, i) => (
                                            <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                                                {msg}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex gap-2 w-full">
                                <Input
                                    placeholder="Type a message..."
                                    className="border-slate-200 flex-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setMessages((prev) => [...prev, (e.target as HTMLInputElement).value]);
                                            (e.target as HTMLInputElement).value = "";
                                        }
                                    }}
                                />
                                <Button
                                    className="whitespace-nowrap"
                                    onClick={() => setMessages((prev) => [...prev, "Test message"])}
                                >
                                    Send
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
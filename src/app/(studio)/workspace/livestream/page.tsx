"use client";

import React, { useState, useEffect } from "react";
import { Copy, Eye, Heart, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { createSteamKey } from "@/app/api/live/create-stream-key";
import { getUserInfo } from "@/features/workspace/api/workspace";
import LiveVideoPlayer from "@/components/workspace/livestream/LiveVideoPlayer";
import {
    getCurrentLiveSession,
    startLiveSession,
    stopLiveSession,
} from "@/app/api/live/live-session";

export default function LivestreamPage() {
    const [streamKey, setStreamKey] = useState("");
    const [title, setTitle] = useState("Check this");
    const [viewCount] = useState(0);
    const [likeCount] = useState(0);
    const [isLive, setIsLive] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [justCopied, setJustCopied] = useState(false);

    const handleGenerateKey = async () => {
        const newKey = await createSteamKey();
        setStreamKey(newKey);
        toast.success(
            "Stream key generated successfully, DON'T SHARE IT WITH ANYONE"
        );
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

        const fetchCurrentLiveSessionState = async () => {
            const data = await getCurrentLiveSession();
            if (data != null) {
                setTitle(data.title);
                setIsLive(true);
            } else {
                setIsLive(false);
            }
        };

        fetchUserInfo();
        fetchCurrentLiveSessionState();
    }, []);

    const manageLiveSession = async () => {
        try {
            if (!isLive) {
                // Starting the stream
                await startLiveSession({ title: title ?? "live" });
                toast.success("Live stream started successfully!");
            } else {
                // Stopping the stream
                await stopLiveSession();
                toast.success("Live stream stopped successfully!");
            }
        } catch (error) {
            console.error("Error managing live session:", error);
            toast.error(`Failed to ${!isLive ? 'start' : 'stop'} live session`);
            // Revert the state change if the API call failed
            // Note: This will be handled by the onClick function
        }
    };

    const handleLiveToggle = async () => {
        const previousState = isLive;

        // Optimistically update the UI
        setIsLive(!isLive);

        try {
            await manageLiveSession();
        } catch (error) {
            // Revert the state if the operation failed
            setIsLive(previousState);
        }
    };

    return (
        <div className="flex flex-col gap-3 p-1">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Livestream
                </h1>
                <Badge
                    variant={isLive ? "default" : "secondary"}
                    className={`text-sm ${isLive ? "bg-green-600 text-white" : ""
                        }`}
                >
                    <Radio
                        className={`h-4 w-4 mr-1 ${isLive ? "text-white animate-pulse" : ""
                            }`}
                    />
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
                            {
                                icon: Eye,
                                label: "Views",
                                count: viewCount,
                                color: "blue",
                            },
                            {
                                icon: Heart,
                                label: "Likes",
                                count: likeCount,
                                color: "purple",
                            }
                        ].map(({ icon: Icon, label, count, color }) => (
                            <Card key={label}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 bg-${color}-100 rounded-full`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 text-${color}-600`}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                {label}
                                            </p>
                                            <p className="text-xl font-semibold">
                                                {count}
                                            </p>
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
                            <CardTitle className="text-lg">
                                Stream Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="stream-title">
                                    Stream Title *
                                </Label>
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
                                        <Copy
                                            className={`h-5 w-5 ${justCopied
                                                ? "text-green-500"
                                                : "text-gray-500"
                                                }`}
                                        />
                                    </Button>
                                    <Button
                                        onClick={handleGenerateKey}
                                        variant="outline"
                                    >
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            {/* Live Toggle */}
                            <Button
                                onClick={handleLiveToggle}
                                className="w-full"
                                variant={isLive ? "destructive" : "default"}
                            >
                                {isLive ? "End Stream" : "Start Stream"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
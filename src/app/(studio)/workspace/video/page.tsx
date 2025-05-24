"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical, Eye, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Mock data - replace with actual data fetching
const videos = [
    {
        id: 1,
        title: "Getting Started with Next.js",
        thumbnail: "/thumbnails/video1.jpg",
        views: 1234,
        status: "published",
        uploadedAt: "2024-03-15",
    },
    {
        id: 2,
        title: "Building a Full Stack App",
        thumbnail: "/thumbnails/video2.jpg",
        views: 567,
        status: "processing",
        uploadedAt: "2024-03-14",
    },
    // Add more mock videos...
];

export default function VideosPage() {
    const [view, setView] = useState<"grid" | "list">("grid");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Videos</h1>
                    <p className="text-muted-foreground">
                        Manage your uploaded videos
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={view === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setView("grid")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <rect width="7" height="7" x="3" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="14" rx="1" />
                            <rect width="7" height="7" x="3" y="14" rx="1" />
                        </svg>
                    </Button>
                    <Button
                        variant={view === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setView("list")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <line x1="8" x2="21" y1="6" y2="6" />
                            <line x1="8" x2="21" y1="12" y2="12" />
                            <line x1="8" x2="21" y1="18" y2="18" />
                            <line x1="3" x2="3.01" y1="6" y2="6" />
                            <line x1="3" x2="3.01" y1="12" y2="12" />
                            <line x1="3" x2="3.01" y1="18" y2="18" />
                        </svg>
                    </Button>
                </div>
            </div>

            {view === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group relative rounded-lg border bg-card text-card-foreground shadow-sm"
                        >
                            <div className="relative aspect-video">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="rounded-t-lg object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold line-clamp-1">
                                    {video.title}
                                </h3>
                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {video.views}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {video.status === "published" ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                        )}
                                        {video.status}
                                    </div>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href={`/workspace/videos/${video.id}`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.map((video) => (
                            <TableRow key={video.id}>
                                <TableCell className="font-medium">
                                    {video.title}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {video.status === "published" ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Clock className="h-4 w-4 text-yellow-500" />
                                        )}
                                        {video.status}
                                    </div>
                                </TableCell>
                                <TableCell>{video.views}</TableCell>
                                <TableCell>{video.uploadedAt}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Link href={`/workspace/videos/${video.id}`}>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
} 
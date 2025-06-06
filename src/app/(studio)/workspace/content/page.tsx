import { Upload, MoreVertical, Clock, RefreshCw, CheckCircle, Pencil, Trash, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadVideoForm from "@/components/workspace/UploadVideoForm";
import fetchResourcesServer from "@/app/api/resources/fetch-server";
import Link from 'next/link'
import { Badge } from "@/components/ui/badge";

export default async function ChannelPage() {

    const videos = await fetchResourcesServer();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Your channel content</h1>
                    <p className="text-muted-foreground">
                        Manage your videos.
                    </p>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Video
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="w-[600px] sm:w-[600px] mx-auto">
                        <SheetHeader>
                            <SheetTitle>Upload Video</SheetTitle>
                            <SheetDescription>
                                Upload a new video to your channel
                            </SheetDescription>
                        </SheetHeader>
                        <UploadVideoForm />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="overflow-x-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <Table className="min-w-full divide-y divide-gray-100 rounded-lg">
                        <TableHeader className="bg-gray-50 rounded-t-lg">
                            <TableRow>
                                <TableHead className="w-[300px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-left rounded-tl-lg">Video Title</TableHead>
                                <TableHead className="w-[100px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center">Views</TableHead>
                                <TableHead className="w-[100px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center">Likes</TableHead>
                                <TableHead className="w-[120px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center">Visible</TableHead>
                                <TableHead className="w-[120px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center">Status</TableHead>
                                <TableHead className="w-[150px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center">Published</TableHead>
                                <TableHead className="w-[70px] px-4 py-2 font-semibold uppercase tracking-wide text-base text-gray-800 text-center rounded-tr-lg">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100">
                            {videos.map((video) => (
                                <TableRow key={video.id} className="hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-none">
                                    <TableCell className="px-4 py-3 text-base text-gray-900">
                                        <div className="font-medium">
                                            {video.title.length > 40
                                                ? `${video.title.substring(0, 40)}...`
                                                : video.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center text-base text-gray-700">
                                        {video.viewCount?.toLocaleString() ?? '0'}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center text-base text-gray-700">
                                        {video.likeCount?.toLocaleString() ?? '0'}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <Badge variant="outline" className="text-base">
                                            {video.isPrivate ? 'Private' : 'Public'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            {video.status === 'UPLOADING' && <Upload className="h-5 w-5 text-yellow-600" />}
                                            {video.status === 'WAITING' && <Clock className="h-5 w-5 text-blue-600" />}
                                            {video.status === 'PROCESSING' && <RefreshCw className="h-5 w-5 animate-spin text-purple-600" />}
                                            {video.status === 'READY' && <CheckCircle className="h-5 w-5 text-green-600" />}
                                            {!['UPLOADING', 'WAITING', 'PROCESSING', 'READY'].includes(video.status) && <XCircle className="h-5 w-5 text-red-600" />}
                                            <span className="font-medium text-base text-gray-800 capitalize">{video.status.toLowerCase()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center text-base text-gray-700">
                                        {video.dateTime}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                    <MoreVertical className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" sideOffset={4} className="w-32 border border-gray-200 rounded-md shadow-lg">
                                                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-base">
                                                    <Pencil className="h-5 w-5 text-blue-600" />
                                                    <Link href={`/workspace/content/${video.id}`}>Edit</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
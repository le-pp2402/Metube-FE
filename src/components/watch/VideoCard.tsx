import { Video } from "@/types/video";
import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";

interface Props {
    video: Video;
    idx?: number;
}

export default function VideoCard({ video, idx = 0 }: Props) {
    const isFeatured = idx === 0;

    return (
        <Link
            href={`/watch?id=${video.id}`}
            className={`group block ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            <Card className="h-full overflow-hidden transition-shadow duration-200 hover:shadow-xl rounded-xl">
                <div className={`relative ${isFeatured ? 'aspect-[16/9]' : 'aspect-video'}`}>
                    <Image
                        src={`https://picsum.photos/seed/${video.id}/800/450`}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                        priority={isFeatured}
                    />
                </div>

                <div className="p-4 space-y-1">
                    <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors
              ${isFeatured ? 'text-lg md:text-xl' : 'text-sm md:text-base'} line-clamp-2`}>
                        {video.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            {video.views}
                        </span>
                        <span>•</span>
                        <span>{video.createdAt}</span>
                        <span>•</span>
                        <span>{video.uploader}</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

import getVideoInfo from "@/app/api/videos/get-video-info";
import { VideoInfo } from "@/types/video";
import { EyeIcon, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DescriptionVideoCard({ id }: { id: number }) {

    const [video, setVideo] = useState<VideoInfo | null>(null);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const data = await getVideoInfo(id);
                console.log("FILE[DescriptionVideoCard.tsx] | data", data);
                setVideo(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchVideoDetails();
    }, [id]);

    return (
        <>
            <div className="flex items-start space-x-4">
                <Image
                    src="/images/male-user.png"
                    alt="Uploader Avatar"
                    className="w-14 h-14 rounded-full ring-4 ring-blue-500/30 shadow-md hover:scale-105 transition-transform"
                    width={56}
                    height={56}
                />
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            {video?.title}
                        </h2>
                        <div className="flex space-x-6">
                            <span className="flex items-center group">
                                <ThumbsUpIcon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform mr-2" />
                                <span className="font-semibold text-gray-700">{video?.likes} Likes</span>
                            </span>
                            <span className="flex items-center group">
                                <EyeIcon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform mr-2" />
                                <span className="font-semibold text-gray-700">{video?.views} Views</span>
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                            <span className="font-medium text-gray-600">Uploaded by:</span>
                            <span className="ml-2 text-blue-600 font-semibold">
                                {video?.username || "anonymous"}
                            </span>
                        </div>

                        <span className="text-gray-500">
                            {video?.createdAt
                                ? new Date(video.createdAt).toLocaleString()
                                : ""}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4"></div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                {video?.description || "No description available."}
            </p>
        </>
    );
}
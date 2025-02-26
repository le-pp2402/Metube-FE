"use client";
import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";

export default function RecommendList() {

    const recommendedVideos = [
        {
            id: 1,
            title: 'some package may fail',
        },
        {
            id: 2,
            title: 'install due to peer',
        },
        {
            id: 3,
            title: 'dependency issues in '
        },
        {
            id: 4,
            title: 'npm'
        },
        {
            id: 5,
            title: 'title video vo van'
        }
    ];

    return (
        <div className="flex flex-col">
            {
                recommendedVideos.map((video) => (
                    <Link href="/watch" className="flex items-center gap-2" key={video.id}>
                        <Card key={video.id} className="cursor-pointer hover:cursor-pointer w-full">
                            <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                                <Image src="/thumbnail.jpg" alt={video.title} width={500} height={500} />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold truncate">{video.title}</h2>
                                <p className="text-xs text-gray-400">Uploaded by: Default User</p>
                            </div>
                        </Card>
                    </Link>
                ))
            }
        </div>
    )
}
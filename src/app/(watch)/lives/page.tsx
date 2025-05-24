"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { LiveSession } from '@/types/live-session';
import { getLiveSession } from '@/app/api/live/live-session';



export default function AllLiveSessions() {

  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    const fetchLiveSessions = async () => {
      try {
        const res = await getLiveSession();

        console.log(res);

        setLiveSessions(res || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchLiveSessions();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        {liveSessions.length > 0 ? (
          liveSessions.map((live) => (
            <Link href={`/lives/${live.id}`} key={live.id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 max-w-full max-h-48 overflow-hidden">
                  <Image
                    src="/thumbnail.jpg"
                    alt={live.title}
                    width={300}
                    height={168}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold truncate">{live.title}</h2>
                  <p className="text-xs text-gray-400">Uploaded by: {live.username}</p>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có video nào để hiển thị.</p>
        )}
      </div>
    </>
  );
}
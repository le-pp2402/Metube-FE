import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getVideos } from "@/utils/videoApi";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Video = {
  id: string;
  title: string;
};

export default async function Home() {
  let videos: Video[] = [];

  try {
    const res = await getVideos();
    videos = res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 p-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link href={`/watch?id=${video.id}`} key={video.id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 max-w-full max-h-48 overflow-hidden">
                  <Image
                    src="/thumbnail.jpg"
                    alt={video.title}
                    width={300}
                    height={168}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold truncate">{video.title}</h2>
                  <p className="text-xs text-gray-400">Uploaded by: Default User</p>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có video nào để hiển thị.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

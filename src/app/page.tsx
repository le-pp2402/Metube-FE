import Image from "next/image";
import VideoPlayer from "./../components/VideoPlayer";

export default function Home() {
  return (
    <div>
      <VideoPlayer videoId="PublicKeyLocation" />
    </div>
  );
}

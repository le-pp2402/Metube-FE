"use client";

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useState } from 'react';
import getVideoInfo from '@/app/api/videos/get-video-info';
import { VideoInfo } from '@/types/video';


interface VideoPlayerProps {
    idVideo: number;
}


// TODO: sau khi transcoding xong video thì ta sẽ tiền hành update video path thành path m3u8 trong module transcoding

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:8080';

function VideoPlayer({ idVideo }: VideoPlayerProps) {

    const [videoInfo, setVideoInfo] = useState<VideoInfo>();

    useEffect(() => {
        const fetchVideoInfo = async () => {
            const result = await getVideoInfo(idVideo);
            // this is temp solution, you have to handle this after finish modify transcoding module
            result.video = result.video.substring(0, result.video.lastIndexOf('/') + 1) + 'master.m3u8';

            console.log(result);
            setVideoInfo(result);
        };

        fetchVideoInfo().catch((error) => {
            console.error("Error fetching video info:", error);
        });
    }, [idVideo]);

    return (
        <MediaPlayer title={videoInfo?.title} src={`${BACKEND_API_URL}/video/${videoInfo?.video}`} autoPlay={true}>
            < MediaProvider />
            <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
        </MediaPlayer >
    );
}

export default VideoPlayer;
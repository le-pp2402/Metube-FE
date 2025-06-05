"use client";


import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const LIVE_API_URL = process.env.NEXT_PUBLIC_LIVE_API_URL ?? 'http://localhost:81';

interface VideoPlayerProps {
    videoUrl: string;
}

export default function LiveVideoPlayer({ videoUrl }: VideoPlayerProps) {

    console.log('[LIVE_API_URL]', LIVE_API_URL);
    console.log('[videoUrl]', videoUrl);


    return (
        <MediaPlayer
            src={`${LIVE_API_URL}/${videoUrl}`}
            autoPlay={true}
            streamType="live"
            className="w-full h-full">
            <MediaProvider />
            <DefaultVideoLayout thumbnails="/images/thumbnail.png" icons={defaultLayoutIcons} />
        </MediaPlayer>
    )
}
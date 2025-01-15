"use client";
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from 'axios';
// import styles from './VideoPlayer.module.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { set } from 'video.js/dist/types/tech/middleware';

interface VideoPlayerProps {
    videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any>(null);
    const [viewCount, setViewCount] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const url = `http://localhost:81/hls/${videoId}.m3u8`; // Replace with actual API response
                // Uncomment if using a backend API:
                // const response = await axios.get(`/api/videos/${videoId}`);
                // const videoData = response.data;
                // setVideoUrl(videoData.url);
                // setViewCount(videoData.viewCount);

                setVideoUrl(url);
                setViewCount(0); // Mock view count
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideo();
    }, [videoId]);

    useEffect(() => {
        if (!videoUrl || !videoRef.current) return;

        const video = videoRef.current;
        let hls: Hls | null = null;

        // Dispose of any existing Video.js players
        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }

        // Initialize HLS or fallback for native HLS support
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => { }));
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
            video.addEventListener('loadedmetadata', () => video.play().catch(() => { }));
        }

        // Initialize Video.js player
        playerRef.current = videojs(video, {
            controls: true,
            autoplay: true,
            preload: 'auto',
            liveui: true,
        });

        // Cleanup
        return () => {
            hls?.destroy();
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [videoUrl]);

    useEffect(() => {
        const socket = new WebSocket("http://localhost:8080/game")

        socket.addEventListener("open", (event) => {
            socket.send("Connection established")
        })

        socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
            setViewCount(event.data)
        })

    }, [])


    return (
        <div className="video-player-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="video-wrapper" style={{ width: '100%', maxWidth: '1280px', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <video
                    id="my-video"
                    ref={videoRef}
                    className="video-js"
                    controls
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
            </div>
            <div className="view-count" style={{ width: '100%', maxWidth: '1280px', marginTop: '10px', textAlign: 'left' }}>
                <p>
                    View Count: <span>{viewCount}</span>
                </p>
            </div>
        </div>
    );
};

export default VideoPlayer;
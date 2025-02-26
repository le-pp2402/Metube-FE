import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface VideoPlayerProps {
    idVideo: number;
}

interface VideoInfo {
    id: string;
    title: string;
    video: string;
    thumbnail: string;
}

// TODO: sau khi transcoding xong video thì ta sẽ tiền hành update video path thành path m3u8 trong module transcoding
function VideoPlayer({ idVideo }: VideoPlayerProps) {

    const [videoInfo, setVideoInfo] = useState<VideoInfo>(
        {
            id: "",
            title: "",
            video: "",
            thumbnail: ""
        }
    );

    useEffect(() => {
        axios.get(`http://localhost:8080/resources/${idVideo}`).then((response) => {
            const res = response.data.data;

            let result: VideoInfo = {
                id: res.id,
                title: res.title,
                video: res.video,
                thumbnail: res.title
            }
            console.log("Before " + result);
            // this is temp solution, you have to handle this after finish modify transcoding module
            result.video = result.video.substring(0, result.video.lastIndexOf('/') + 1) + 'index.m3u8';

            console.log(result);

            setVideoInfo(result);

        }).catch((error) => {
            console.log(idVideo);
            console.log(error);
        });
    }, [idVideo]);

    return (
        <MediaPlayer title="Sprite Fight" src={`http://localhost:8080/video/${videoInfo.video}`}>
            < MediaProvider />
            <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
        </MediaPlayer >
    );
}

export default VideoPlayer;
import React from 'react';
import VideoPlayer from 'next-video';
import useFullscreenOrientation from '../hooks/useFullscreenOrientation';

interface VideoCardProps {
    title: string;
    videoSrc: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, videoSrc }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Apply the fullscreen orientation logic to the video element
    useFullscreenOrientation(videoRef);

    return (
        <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden text-slate-300">
            <VideoPlayer
                ref={videoRef} // Attach ref to VideoPlayer
                src={videoSrc}
                controls
                className="w-full h-auto"
                poster="videos/thumb.svg" // Add the poster prop for thumbnail
            />
            <div className="p-4">
                <h2 className="text-md font-semibold">{title}</h2>
            </div>
        </div>
    );
};

export default VideoCard;

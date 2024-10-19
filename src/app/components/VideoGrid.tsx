import React from 'react';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: string[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {videos.map((video, index) => (
        <VideoCard key={index} title={video} videoSrc={`/videos/${video}`} />
      ))}
    </div>
  );
};

export default VideoGrid;

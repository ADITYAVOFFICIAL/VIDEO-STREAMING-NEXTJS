import path from 'path';
import fs from 'fs';
import VideoPage from './components/VideoPage';

export default function Home() {
  // Reading the videos from the public folder (server-side logic)
  const videosDirectory = path.join(process.cwd(), '/public/videos');
  const videoFiles = fs.readdirSync(videosDirectory).filter(file => file.endsWith('.mp4'));

  return (
    <div>
      {/* Pass the video files to the client component */}
      <VideoPage videos={videoFiles} />
    </div>
  );
}

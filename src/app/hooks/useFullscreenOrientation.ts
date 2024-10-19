import { useEffect } from 'react';

const useFullscreenOrientation = (videoRef: React.RefObject<HTMLVideoElement>) => {
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Access webkitFullscreenElement without casting to 'any'
      const isFullscreen =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (isFullscreen && window.innerWidth < 768) {
        // Check if it's a mobile device and request landscape orientation
        if (screen.orientation) {
          screen.orientation.lock('landscape').catch((err) => {
            console.error('Failed to lock orientation:', err);
          });
        }
      } else {
        // Unlock orientation when exiting fullscreen
        if (screen.orientation) {
          screen.orientation.unlock().catch((err) => {
            console.error('Failed to unlock orientation:', err);
          });
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [videoRef]);
};

export default useFullscreenOrientation;

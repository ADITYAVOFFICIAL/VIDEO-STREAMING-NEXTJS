'use client'; // This marks the component as a client component
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import VideoGrid from './VideoGrid';

interface VideoPageProps {
  videos: string[];
}

const ITEMS_PER_PAGE = 12; // Number of videos per page

const VideoPage: React.FC<VideoPageProps> = ({ videos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]); // State for suggestions

  useEffect(() => {
    // Simulating a loading time with a timeout
    const timer = setTimeout(() => {
      setFilteredVideos(videos); // Initially set filtered videos
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [videos]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = videos.filter(video =>
      video.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredVideos(filtered);
    setCurrentPage(1); // Reset to first page on filter change
    // Set suggestions based on the current search term
    const filteredSuggestions = videos.filter(video => 
      video.toLowerCase().includes(lowercasedFilter)
    );
    setSuggestions(filteredSuggestions);
  }, [searchTerm, videos]);

  // Calculate the current videos to display based on the current page
  const indexOfLastVideo = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstVideo = indexOfLastVideo - ITEMS_PER_PAGE;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={(e) => setSearchTerm(e.target.value)} 
          suggestions={suggestions} // Pass suggestions to SearchBar
        />
        
        {/* Show loader while loading */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {currentVideos.length === 0 ? (
              <div className="flex flex-col justify-center items-center min-h-[200px] mt-[25px] text-[#57abd7] text-[24px] font-bold text-center bg-[#57abd7]/[0.1] border-2 border-dashed border-[#57abd7] rounded-[15px] p-5">
              <p>⚠️ No Videos found</p>
            </div>            
            ) : (
              <>
                <VideoGrid videos={currentVideos} />
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <button 
                      className="mr-2 p-2 bg-blue-600 text-white rounded" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {/* Page Number Links */}
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`mx-1 p-2 rounded ${currentPage === index + 1 ? 'bg-blue-700' : 'bg-blue-600'} text-white`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="ml-2 p-2 bg-blue-600 text-white rounded" 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
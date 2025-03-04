import React, { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import videoThumb from "../../assets/home/videoThumb.svg";

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <div className="flex flex-col items-center pb-15 md:pb-25 p-8">
      <h2 className="text-[20px] sm:text-[28px] md:text-[40px] leading-6 md:leading-15 font-semibold text-[#076300] mb-4">
        Why Choose Reparv?
      </h2>
      <div className="relative w-[350px] h-[200px] sm:w-[500px] sm:h-[280px] md:w-[579px] md:h-[340px] lg:w-[779px] lg:h-[440px] max-w-4xl rounded-xl shadow-[0px_4px_8px_0px_#0000001A] overflow-hidden">
        
        {/* Thumbnail */}
        {!showVideo && (
          <img
            src={videoThumb}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
        )}

        {/* Video Iframe */}
        {showVideo && (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/3bmzcxBu5H0?autoplay=1&mute=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
        
        {/* Play Button Overlay */}
        {!showVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
            <button
              onClick={() => setShowVideo(true)}
              className="w-20 h-20 bg-[#00000099] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <IoPlayCircleOutline className="text-white w-12 h-12" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
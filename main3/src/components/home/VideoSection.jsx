import React, { useState, useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import videoThumb from "../../assets/home/videoThumb.svg";
import { useAuth } from "../../store/auth";

const VideoSection = () => {
  const { URI } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const formatYouTubeEmbedUrl = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };
  // **Fetch Data from API**
  const fetchFeedback = async () => {
    try {
      const response = await fetch(URI + "/frontend/testimonial", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch testimonials.");

      const data = await response.json();
      const reparvFeedback = data.filter(
        (item) => item.client.toLowerCase() === "reparv"
      );

      if (reparvFeedback.length > 0 && reparvFeedback[0].url) {
        const videoURL = formatYouTubeEmbedUrl(reparvFeedback[0].url);
        if (videoURL) {
          setVideoLink(videoURL);
        } else {
          alert("Invalid YouTube URL");
        }
      } else {
        alert("No Video Found");
      }
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="flex flex-col items-center pb-15 md:pb-25 p-8">
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
        {showVideo && videoLink && (
          <iframe
            className="w-full h-full"
            src={videoLink}
            title="YouTube video"
            frameBorder="0"
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

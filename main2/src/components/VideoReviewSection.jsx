import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const VideoReviewSection = () => {
  const { URI } = useAuth();
  const [feedback, setFeedback] = useState([]);

  // **Fetch Data from API**
  const fetchFeedback = async () => {
    try {
      const response = await fetch(URI + "/frontend/testimonial", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch testimonials.");
      const data = await response.json();
      const reparvFeedback = data.filter(
        (item) => item.client.toLowerCase() !== "reparv"
      );
      setFeedback(reparvFeedback);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Extract YouTube Video ID
  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  return (
    <div className="w-full max-w-[1400px] flex flex-col gap-2 lg:justify-center lg:items-center mx-auto p-0 sm:p-5 pb-15 md:pb-25 ">
      <h2 className="text-center text-[20px] sm:text-[28px] md:text-[40px] leading-6 md:leading-15 font-semibold text-[#076300] ">
        See what customers are saying
      </h2>
      <div className="overflow-scroll scrollbar-hide w-full max-w-[1400px] grid grid-flow-col gap-4 sm:gap-6 my-2 sm:my-4 place-items-center px-2">
        {feedback.map((review) => {
          const videoId = extractYouTubeId(review.url);
          return (
            <div
              key={review.id}
              className="w-full min-w-[350px] md:min-w-[437px] bg-white rounded-xl p-4 border border-[#00000033] "
            >
              {videoId ? (
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              ) : (
                <p>Invalid video URL</p>
              )}
              <div className="mt-2">
                <p className="font-semibold">{review.client}</p>
                <p className="text-sm text-gray-600">{review.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoReviewSection;
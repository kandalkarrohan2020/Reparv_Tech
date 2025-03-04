import React from "react";

const reviews = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    reviewer: "Pawan",
    comment: "Amazing service! Highly recommend."
  },
  {
    id: 2,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    reviewer: "Ashutosh",
    comment: "Very satisfied with the experience!"
  },
  {
    id: 3,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    reviewer: "Sarthak",
    comment: "Exceptional quality and great support."
  },
  {
    id: 4,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    reviewer: "Anshul",
    comment: "Very satisfied with the experience!"
  },
  {
    id: 5,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    reviewer: "Rohan",
    comment: "Amazing service! Highly recommend."
  }
];

const VideoReviewSection = () => {
  return (
    <div className="w-full max-w-[1400px] flex flex-col gap-2 lg:justify-center lg:items-center mx-auto p-0 sm:p-5 pb-15 md:pb-25 ">
      <h2 className="text-center text-[20px] sm:text-[28px] md:text-[40px] leading-6 md:leading-15 font-semibold text-[#076300] ">See what customers are saying</h2>
      <div className="overflow-scroll scrollbar-hide w-full max-w-[1400px] grid grid-flow-col gap-4 sm:gap-6 my-2 sm:my-4 place-items-center px-2">
        {reviews.map((review) => ( 
          <div key={review.id} className="w-full min-w-[350px] md:min-w-[437px] bg-white rounded-xl p-4 border border-[#00000033] ">
            <video controls className="w-full rounded-lg">
              <source src={review.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-2">
              <p className="font-semibold">{review.reviewer}</p>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoReviewSection;

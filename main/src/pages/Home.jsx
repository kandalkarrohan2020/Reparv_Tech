import React from 'react'
import ImageSlider from '../components/home/ImageSlider'
import HomePropertyGrid from '../components/home/HomePropertyGrid'
import VideoSection from '../components/home/VideoSection'
import StepsSection from '../components/home/StepsSection'
import VideoReviewSection from '../components/VideoReviewSection'
function Home() {
  return (
    <div className="full" >
     <ImageSlider className="" />
     <HomePropertyGrid/>
     <VideoSection/>
     <StepsSection/>
     <VideoReviewSection/>
    </div>
    
  )
}

export default Home
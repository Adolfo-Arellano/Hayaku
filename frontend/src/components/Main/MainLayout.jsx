import React from 'react'
import Sidebar from './/Sidebar/Sidebar'
import Carousel from './Carousel/Carousel'
import RecommendedStreams from './RecommendedStreams/RecommendedStreams'

const MainLayout = () => {
  return (
    <div className=''>
        <Sidebar></Sidebar>
        <div className='ml-64 mt-14 min-h-screen'>
            <Carousel></Carousel>
            <RecommendedStreams></RecommendedStreams>
        </div>
    </div>
  )
}

export default MainLayout
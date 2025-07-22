import React, { useState, useEffect } from 'react'
import { ArrowLeftFromLine, Heart, Video } from 'lucide-react'
import LiveStreamsList from './SubComponents/LiveStreamsList'
import { getTopStreams } from '../../../services/twitchApi'

const Sidebar = () => {
  const [randomLiveStreams, setRandomLiveStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRandomStreams = async () => {
      try {
        setLoading(true);
        
        const streamsData = await getTopStreams(50);
        
        const shuffledStreams = streamsData
          .sort(() => 0.5 - Math.random())
          .slice(0, 12);
        
        setRandomLiveStreams(shuffledStreams);
        
      } catch (error) {
        console.error('Error cargando streams aleatorios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRandomStreams();

    const interval = setInterval(loadRandomStreams, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='fixed left-0 w-64 h-[calc(100vh-60px)] bg-[#1f1f23] overflow-y-auto border-r border-gray-700 z-20 p-2'>
      <div className='flex justify-between items-center my-3'>
        <h1 className='text-ms font-semibold text-white'>Para ti</h1>
        <ArrowLeftFromLine className='text-gray-400' />
      </div>

      <div className='flex justify-between items-center my-3'>
        <h2 className='text-ms font-semibold text-white'>Canales que sigo</h2>
        <Heart className='text-gray-400' />
      </div>

      <div className='flex-1 overflow-y-auto my-3'>
        <div className='flex justify-between mb-2'>
          <h2 className='text-ms font-semibold text-white'>Canales en directo</h2>
          <Video className='text-gray-400' />
        </div>
        
        <LiveStreamsList 
          liveStreams={randomLiveStreams}
          loading={loading}
        />
      </div>

      <div className='flex items-center gap-2 p-4 hidden'>
        <h2 className='text-white'>Los espectadores de {} también ven</h2>
      </div>
    </div>
  )
}

export default Sidebar
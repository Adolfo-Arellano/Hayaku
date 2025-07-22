import React, { useState, useEffect } from 'react'
import ChannelPrevCard from './SubComponents/ChannelPrevCard'
import { getTopStreams, getTopGames } from '../../../services/twitchApi'

const RecommendedStreams = () => {
  const [streams, setStreams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [streamsData, gamesData] = await Promise.all([
          getTopStreams(8),
          getTopGames(8)
        ]);
        
        setStreams(streamsData);
        setGames(gamesData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className='mt-14 mx-6'>
        <div className='text-white'>Cargando streams recomendados...</div>
      </div>
    );
  }

  return (
    <div className='mt-14 mx-6'>
      <div>
        <h2 className='text-lg font-semibold'>Canales en directo que podrían gustarte</h2>
        <div className='flex flex-wrap gap-4 mt-4'>
          {streams.map((stream, index) => (
            <ChannelPrevCard 
              key={stream.id || index}
              streamData={stream}
            />
          ))}
        </div>
        <div className='flex items-center gap-4 my-4'>
          <hr className='flex-1 border-gray-600'></hr>
          <span>Mostrar más</span>
          <hr className='flex-1 border-gray-600'></hr>
        </div>
      </div>

      <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Categorías que podrían interesarte</h2>
        <div className='flex flex-wrap gap-4 mt-4'>
          {games.map((game, index) => (
            <ChannelPrevCard 
              key={game.id || index}
              gameData={game}
            />
          ))}
        </div>
        <div className='flex items-center gap-4 my-4'>
          <hr className='flex-1 border-gray-600'></hr>
          <span>Mostrar más</span>
          <hr className='flex-1 border-gray-600'></hr>
        </div>
      </div>
    </div>
  )
}

export default RecommendedStreams
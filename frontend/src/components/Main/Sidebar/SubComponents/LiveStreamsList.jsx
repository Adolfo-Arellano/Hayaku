import React from 'react'
import LiveStreamItem from './LiveStreamItem'

const LiveStreamsList = ({ liveStreams, loading }) => {
  
  if (loading) {
    return (
      <div className='flex flex-col gap-2'>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className='flex items-center gap-3 p-2 animate-pulse'>
            <div className='w-8 h-8 bg-gray-600 rounded-full'></div>
            <div className='flex-1'>
              <div className='h-3 bg-gray-600 rounded mb-1'></div>
              <div className='h-2 bg-gray-700 rounded w-3/4'></div>
            </div>
            <div className='h-2 bg-gray-700 rounded w-8'></div>
          </div>
        ))}
      </div>
    );
  }

  if (liveStreams.length === 0) {
    return (
      <div className='text-gray-400 text-sm p-2 text-center'>
        No se pudieron cargar streams
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-1 w-auto h-auto'>
      {liveStreams.map(stream => (
        <LiveStreamItem 
          key={stream.id}
          streamData={stream}
          isLive={true}
        />
      ))}
    </div>
  )
}

export default LiveStreamsList
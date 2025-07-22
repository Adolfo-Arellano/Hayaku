import React from 'react'

const LiveStreamItem = ({ streamData, isLive = true }) => {
  
  const formatViewers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 10000) return `${(count / 10000).toFixed(1)}K`;
    return count?.toString() || '0';
  };

  if (!streamData) return null;

  const {
    user_name,
    user_login,
    game_name,
    viewer_count,
    profile_image_url
  } = streamData;

  const imageSrc = profile_image_url || `https://unavatar.io/twitch/${user_login}`;

  return (
    <div className='flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition-colors cursor-pointer group'>
      <div className='relative'>
        <img 
          className='w-8 h-8 rounded-full' 
          src={imageSrc} 
          alt={`Avatar de ${user_name}`}
          onError={(e) => {
            e.target.src = `https://unavatar.io/twitch/${user_login}`;
          }}
        />
        {isLive && (
          <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1f1f23] animate-pulse'></div>
        )}
      </div>
      
      <div className='flex-1 min-w-0'>
        <p className='text-white text-sm font-medium truncate group-hover:text-redP transition-colors' title={user_name}>
          {user_name}
        </p>
        <p className='text-gray-400 text-xs truncate' title={game_name}>
          {game_name || 'Sin categoría'}
        </p>
      </div>
      
      <div className='text-gray-300 text-xs font-medium'>
        {formatViewers(viewer_count)}
      </div>
    </div>
  );
}

export default LiveStreamItem
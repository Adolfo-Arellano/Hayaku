import React from 'react'

const ChannelPrevCard = ({ streamData, gameData }) => {
  const formatViewers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count?.toString() || '0';
  };

  if (streamData) {
    const {
      user_name,
      user_login,
      title,
      game_name,
      viewer_count,
      thumbnail_url,
      profile_image_url
    } = streamData;

    const thumbnailSrc = thumbnail_url?.replace('{width}', '320').replace('{height}', '176');
    const profileImageSrc = profile_image_url || `https://unavatar.io/twitch/${user_login}`;

    return (
      <div>
        <div className='relative w-80 h-44 p-4 border border-gray-300 overflow-hidden'>
          {thumbnailSrc && (
            <img 
              src={thumbnailSrc}
              alt={`Stream de ${user_name}`}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
          <span className='absolute top-0 left-0 px-1 m-2 rounded-sm bg-red-600 font-semibold text-sm text-white'>
            EN DIRECTO
          </span>
          <span className='absolute bottom-0 left-0 px-1 m-2 border border-black bg-black/75 text-sm text-white'>
            {formatViewers(viewer_count)} espectadores
          </span>
        </div>
        <div className='w-80 px-0.5 pt-2.5 flex'>
          <img 
            className='w-12 h-12 rounded-full' 
            src={profileImageSrc} 
            alt={`Avatar de ${user_name}`}
          />
          <div className='ml-1.5 min-w-0 flex-1'>
            <div>
              <h2 className='font-semibold line-clamp-2 text-sm leading-tight'>
                {title || 'Sin título'}
              </h2>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500'>{user_name}</span>
              <a className='text-sm text-red-400 hover:underline' href='#'>
                {game_name || 'Sin categoría'}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameData) {
    const { name, box_art_url } = gameData;
    const gameImageSrc = box_art_url?.replace('{width}', '320').replace('{height}', '176');

    return (
      <div>
        <div className='relative w-80 h-44 p-4 border border-gray-300 overflow-hidden'>
          {gameImageSrc && (
            <img 
              src={gameImageSrc}
              alt={`Categoría ${name}`}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>
          <span className='absolute bottom-0 left-0 text-white font-bold text-lg m-2'>
            {name}
          </span>
        </div>
        <div className='w-80 px-0.5 pt-2.5'>
          <h2 className='font-semibold'>{name}</h2>
          <span className='text-sm text-gray-500'>Categoría</span>
        </div>
      </div>
    );
  }

  return null;
}

export default ChannelPrevCard
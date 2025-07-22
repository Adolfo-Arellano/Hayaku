import React from 'react'
import { Play, Eye } from 'lucide-react'

const MainStreamCard = ({ streamData }) => {
  if (!streamData) {
    return (
      <div className="relative w-[600px] h-80 rounded-2xl bg-gray-800 flex items-center justify-center">
        <div className="text-gray-500">Stream no disponible</div>
      </div>
    );
  }

  const {
    user_name,
    user_login,
    title,
    game_name,
    viewer_count,
    thumbnail_url,
    profile_image_url
  } = streamData;

  const thumbnailSrc = thumbnail_url?.replace('{width}', '600').replace('{height}', '320');
  const profileImageSrc = profile_image_url || `https://unavatar.io/twitch/${user_login}`;

  const formatViewerCount = (count) => {
    if (!count || count === 0) return '0';
    
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 10000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleImageError = (e) => {
    e.target.src = `https://unavatar.io/twitch/${user_login}`;
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://hayaku/${user_login}`, '_blank', 'noopener,noreferrer'); {/* TODO: Links a los streams */}
  };

  return (
    <div className="relative w-[600px] h-80 overflow-hidden shadow-2xl group cursor-pointer transform transition-all duration-500 hover:scale-105 rounded-2xl">
      {thumbnailSrc ? (
        <img 
          src={thumbnailSrc}
          alt={`Stream de ${user_name} jugando ${game_name || 'contenido variado'}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-gray-500">Imagen no disponible</div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20">
        <button 
          onClick={handlePlayClick}
          className="bg-red-600 text-white p-5 rounded-full hover:bg-red-700 transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Ver stream de ${user_name}`}
          type="button"
        >
          <Play size={32} className="ml-1" />
        </button>
      </div>
      
      <div className="absolute top-2 left-2 bg-red-600 text-white px-2.5 py-1 rounded-lg text-base font-bold flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        EN VIVO
      </div>
      
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg flex items-center gap-2 text-base backdrop-blur-sm">
        <Eye size={18} />
        <span aria-label={`${viewer_count} espectadores`}>
          {formatViewerCount(viewer_count)}
        </span>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="flex items-center gap-4 mb-2">
          <img 
            src={profileImageSrc} 
            alt={`Avatar de ${user_name}`}
            className="w-14 h-14 rounded-full border-3 border-white"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-2xl truncate" title={user_name}>
              {user_name || 'Usuario desconocido'}
            </h3>
            <p className="text-purple-300 text-lg truncate" title={game_name}>
              {game_name || 'Sin categoría'}
            </p>
          </div>
        </div>
        <p className="text-white text-base leading-tight line-clamp-2" title={title}>
          {title || 'Sin título'}
        </p>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MainStreamCard;
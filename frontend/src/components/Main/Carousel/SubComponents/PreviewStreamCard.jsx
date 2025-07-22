import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PreviewStreamCard = ({ streamData, size = 'large', onClick, rotationClass = '', showNavIcon = false, navDirection = 'left' }) => {
  if (!streamData) {
    return null;
  }

  const {
    user_name,
    user_login,
    thumbnail_url,
    profile_image_url
  } = streamData;

  const dimensions = size === 'large' 
    ? { width: 'w-48', height: 'h-32' }
    : { width: 'w-40', height: 'h-28' };

  const thumbnailSrc = thumbnail_url?.replace('{width}', '200').replace('{height}', '120');
  const profileImageSrc = profile_image_url || `https://unavatar.io/twitch/${user_login}`;

  const opacityClass = size === 'large' 
    ? 'opacity-70 hover:opacity-90' 
    : 'opacity-50 hover:opacity-75';

  const handleImageError = (e) => {
    e.target.src = `https://unavatar.io/twitch/${user_login}`;
  };

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={`${dimensions.width} ${dimensions.height} rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${rotationClass} ${opacityClass} relative group focus:outline-none focus:ring-2 focus:ring-white/50`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Preview del stream de ${user_name}`}
    >
      {thumbnailSrc ? (
        <img 
          src={thumbnailSrc} 
          alt={`Preview de ${user_name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-gray-500 text-sm">Sin imagen</div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
      
      {showNavIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          {navDirection === 'left' ? (
            <ChevronLeft className="text-white w-8 h-8 opacity-80" aria-hidden="true" />
          ) : (
            <ChevronRight className="text-white w-8 h-8 opacity-80" aria-hidden="true" />
          )}
        </div>
      )}
      
      {size === 'large' && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <img 
              src={profileImageSrc} 
              alt={`Avatar de ${user_name}`}
              className="w-6 h-6 rounded-full border border-white"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="text-white text-sm font-medium truncate">
              {user_name || 'Usuario desconocido'}
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
        EN VIVO
      </div>
    </div>
  );
};

export default PreviewStreamCard;
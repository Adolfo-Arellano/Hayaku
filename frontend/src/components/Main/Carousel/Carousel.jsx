import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MainStreamCard from './SubComponents/MainStreamCard'
import PreviewStreamCard from './SubComponents/PreviewStreamCard'
import { getFeaturedStreams } from '../../../services/twitchApi'

const Carousel = () => {
  const [streams, setStreams] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeaturedStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const featuredStreams = await getFeaturedStreams(5);
      
      if (featuredStreams && featuredStreams.length > 0) {
        setStreams(featuredStreams);
      } else {
        setError('No hay streams disponibles en este momento');
      }
    } catch (err) {
      setError('Error al cargar los streams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedStreams();
  }, []);

  const nextSlide = () => {
    if (streams.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % streams.length);
    }
  };

  const prevSlide = () => {
    if (streams.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + streams.length) % streams.length);
    }
  };

  const getCircularIndex = (index, offset) => {
    if (streams.length === 0) return 0;
    return (index + offset + streams.length) % streams.length;
  };

  const handleIndicatorClick = (index) => {
    if (index >= 0 && index < streams.length) {
      setCurrentIndex(index);
    }
  };

  const handlePreviewClick = (targetIndex) => {
    if (targetIndex >= 0 && targetIndex < streams.length) {
      setCurrentIndex(targetIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 rounded-2xl" role="status" aria-label="Cargando streams">
        <div className="text-white text-xl">Cargando streams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-2xl">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4" role="alert">{error}</div>
          <button 
            onClick={loadFeaturedStreams}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-2xl">
        <div className="text-white text-xl">No hay streams disponibles</div>
      </div>
    );
  }

  return (
    <div className="relative w-full" role="region" aria-label="Carrusel de streams destacados">
      <div className="w-full h-96 flex items-center justify-between px-20">
        
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full hover:bg-white/30 transition-all backdrop-blur-sm z-20 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={loading || streams.length <= 1}
          aria-label="Stream anterior"
          type="button"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center justify-center flex-1 max-w-6xl mx-4">
          
          <div className="flex flex-col items-center space-y-4">
            <PreviewStreamCard
              streamData={streams[getCircularIndex(currentIndex, -1)]}
              size="large"
              onClick={() => handlePreviewClick(getCircularIndex(currentIndex, -1))}
              rotationClass="hover:-rotate-3"
            />
            <PreviewStreamCard
              streamData={streams[getCircularIndex(currentIndex, -2)]}
              size="small"
              onClick={() => handlePreviewClick(getCircularIndex(currentIndex, -2))}
              rotationClass="hover:-rotate-2"
            />
          </div>

          <div className="mx-8 flex-shrink-0">
            <MainStreamCard streamData={streams[currentIndex]} />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <PreviewStreamCard
              streamData={streams[getCircularIndex(currentIndex, 1)]}
              size="large"
              onClick={() => handlePreviewClick(getCircularIndex(currentIndex, 1))}
              rotationClass="hover:rotate-3"
            />
            <PreviewStreamCard
              streamData={streams[getCircularIndex(currentIndex, 2)]}
              size="small"
              onClick={() => handlePreviewClick(getCircularIndex(currentIndex, 2))}
              rotationClass="hover:rotate-2"
            />
          </div>

        </div>

        <button 
          onClick={nextSlide}
          className="p-3 rounded-full hover:bg-white/30 transition-all backdrop-blur-sm z-20 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={loading || streams.length <= 1}
          aria-label="Siguiente stream"
          type="button"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3" role="tablist" aria-label="Indicadores de stream">
        {streams.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Stream ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
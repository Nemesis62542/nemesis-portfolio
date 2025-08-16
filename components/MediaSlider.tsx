import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaSliderProps {
  media: MediaItem[];
  className?: string;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ media, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  if (!media || media.length === 0) {
    return (
      <div className={`bg-surface rounded-lg flex items-center justify-center h-64 ${className}`}>
        <p className="text-text-secondary">メディアがありません</p>
      </div>
    );
  }

  const currentMedia = media[currentIndex];
  const totalItems = media.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleVideoPlay = (videoElement: HTMLVideoElement, index: number) => {
    const playing = isPlaying[index] || false;
    if (playing) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(prev => ({ ...prev, [index]: !playing }));
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying[currentIndex]) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleVideoRef = (element: HTMLVideoElement | null, index: number) => {
    if (element) {
      element.onplay = () => {
        setIsPlaying(prev => ({ ...prev, [index]: true }));
        resetControlsTimeout();
      };
      element.onpause = () => {
        setIsPlaying(prev => ({ ...prev, [index]: false }));
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
      element.onended = () => {
        setIsPlaying(prev => ({ ...prev, [index]: false }));
        setShowControls(true);
      };
      element.ontimeupdate = () => {
        setProgress(element.currentTime);
        setDuration(element.duration);
      };
      element.onloadedmetadata = () => {
        setDuration(element.duration);
      };
    }
  };

  const handleMouseMove = () => {
    if (currentMedia.type === 'video') {
      resetControlsTimeout();
    }
  };

  const handleSeek = (newTime: number) => {
    const videoElement = document.querySelector('video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.currentTime = newTime;
      setProgress(newTime);
    }
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* メディア表示エリア */}
      <div className="relative bg-black aspect-video" onMouseMove={handleMouseMove}>
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.title || `Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('画像の読み込みに失敗:', currentMedia.url);
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={(el) => handleVideoRef(el, currentIndex)}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              controls={false}
              preload="metadata"
              onError={(e) => {
                console.error('動画の読み込みに失敗:', currentMedia.url);
              }}
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                toggleVideoPlay(video, currentIndex);
              }}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                showControls || !isPlaying[currentIndex] 
                  ? 'bg-black/30 hover:bg-black/50 opacity-100' 
                  : 'bg-transparent opacity-0 pointer-events-none'
              }`}
            >
              <div className={`bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 ${
                showControls || !isPlaying[currentIndex] ? 'scale-100' : 'scale-0'
              }`}>
                {isPlaying[currentIndex] ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </button>

            {/* シークバー */}
            {duration > 0 && (
              <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                showControls || !isPlaying[currentIndex] ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="relative">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-100"
                      style={{ width: `${(progress / duration) * 100}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-xs text-white mt-1">
                  <span>{Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}</span>
                  <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 複数メディアの場合のナビゲーション */}
        {totalItems > 1 && (
          <>
            {/* 前へボタン */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* 次へボタン */}
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* メディアタイプインジケーター */}
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentMedia.type === 'image' ? '画像' : '動画'} {currentIndex + 1}/{totalItems}
            </div>
          </>
        )}
      </div>

      {totalItems > 1 && (
        <div className="mt-4">
          <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative w-16 h-12 rounded border-2 transition-all duration-200 overflow-hidden ${
                  index === currentIndex
                    ? 'border-accent shadow-lg scale-105'
                    : 'border-surface hover:border-overlay hover:scale-102'
                }`}
                aria-label={`メディア ${index + 1} に移動`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full bg-black">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    {/* 動画アイコン */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                {/* 選択中インジケーター */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-accent/20 border border-accent rounded"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* メディアタイトル */}
      {currentMedia.title && (
        <div className="mt-2 text-center text-text-secondary text-sm">
          {currentMedia.title}
        </div>
      )}
    </div>
  );
};

// Mock lucide-react icons
if (typeof ChevronLeft === 'undefined') {
  (window as any).ChevronLeft = () => <svg/>;
  (window as any).ChevronRight = () => <svg/>;
  (window as any).Play = () => <svg/>;
  (window as any).Pause = () => <svg/>;
}

export default MediaSlider;
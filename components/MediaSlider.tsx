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

  const handleVideoRef = (element: HTMLVideoElement | null, index: number) => {
    if (element) {
      element.onplay = () => setIsPlaying(prev => ({ ...prev, [index]: true }));
      element.onpause = () => setIsPlaying(prev => ({ ...prev, [index]: false }));
      element.onended = () => setIsPlaying(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* メディア表示エリア */}
      <div className="relative bg-black aspect-video">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.title || `Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={(el) => handleVideoRef(el, currentIndex)}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              controls={false}
              preload="metadata"
            />
            
            {/* カスタム再生ボタン */}
            <button
              onClick={(e) => {
                e.preventDefault();
                const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                toggleVideoPlay(video, currentIndex);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                {isPlaying[currentIndex] ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </button>
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

      {/* ドットインジケーター（複数メディアの場合のみ） */}
      {totalItems > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-accent'
                  : 'bg-surface hover:bg-overlay'
              }`}
              aria-label={`メディア ${index + 1} に移動`}
            />
          ))}
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
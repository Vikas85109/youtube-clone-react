import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { addToHistory, updateProgress, selectVideoProgress } from '../../store/slices/historySlice';

const VideoPlayer = ({ video }) => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const savedProgress = useSelector(selectVideoProgress(video?.id));

  // Add to history when video starts
  useEffect(() => {
    if (video) {
      dispatch(addToHistory(video));
    }
  }, [video, dispatch]);

  // Seek to saved progress when video loads
  const handleReady = () => {
    if (savedProgress > 0 && savedProgress < 90 && playerRef.current) {
      playerRef.current.seekTo(savedProgress / 100, 'fraction');
    }
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);

    // Update progress in history every 10 seconds
    if (video && Math.floor(state.playedSeconds) % 10 === 0 && state.playedSeconds > 0) {
      dispatch(updateProgress({ videoId: video.id, progress: state.played * 100 }));
    }
  };

  // Demo video URL (using public domain sample videos)
  const defaultVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoUrl = video?.videoUrl || defaultVideoUrl;

  return (
    <div
      ref={containerRef}
      className="video-player-container relative bg-black aspect-video"
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        controls={true}
        onReady={handleReady}
        onProgress={handleProgress}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        progressInterval={1000}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;

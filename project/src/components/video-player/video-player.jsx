import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({cover, src, width, height, isActive, muted}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (isPlaying !== isActive) {
      setIsPlaying(isActive);
      if (isActive) {
        timerId.current = setTimeout(() => {
          videoRef.current.play();
        }, 1000);

      } else {
        clearTimeout(timerId.current);
        videoRef.current.load();
      }
    }
  }, [isActive, isPlaying]);

  return (
    <video
      ref={videoRef}
      poster={cover}
      src={src}
      width={width}
      height={height}
      muted={muted}
      preload='auto'
    />
  );
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
};

export default VideoPlayer;


import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({cover, src, width, height, isActive, muted}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying !== isActive) {
      setIsPlaying(isActive);
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.load();
      }
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      poster={cover}
      src={src}
      width={width}
      height={height}
      muted={muted}
      preload='auto'
      controls
    >
    </video>
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


import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import filmProp from '../film/film.prop';
import PropTypes from 'prop-types';
import {fetchCurrentFilm} from '../../store/api-actions';
import {AppRoute, LoadedData} from '../../consts';
import PlayerSpinner from '../player-spinner/player-spinner';
import Page404 from '../page-404/page-404';
import { Link } from 'react-router-dom';

import './player.css';

const getHour = (hour) => {
  if (hour === 0) {
    return '';
  }
  if (hour < 10) {
    return String(hour).padStart(2, '0');
  }
  return String(hour);
};

const getMinute = (minute) => {
  if (minute < 10) {
    return String(minute).padStart(2, '0');
  }
  return String(minute);
};

const getSecond = (second) => {
  if (second < 10) {
    return String(second).padStart(2, '0');
  }
  return String(second);
};

const formatPlayerTime = (duration, prefix = '') => {
  const hour = Math.floor(duration / 3600);
  const minute = Math.floor((duration - hour * 3600) / 60);
  const second = duration - hour * 3600 - minute * 60;

  return `${prefix}${getHour(hour)}${hour ? ':' : ''}${getMinute(minute)}:${getSecond(second)}`;
};

const onPauseButtonClick = (video) => {
  video?.pause();
};

const onPlayButtonClick = (video) => {
  video?.play();
};

const onFullScreenButtonClick = (elem) => {
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  } else {
    document.exitFullscreen();
  }
};

const getDuration = (video) => {
  if (video?.duration) {
    return Math.floor(video.duration);
  }
  return '0';
};

const getPercentage = (part, whole) => (part / whole) * 100;


function Player({filmId, film, isDataLoaded, getFilm}) {
  useEffect(() => {
    getFilm(filmId);
  }, [filmId, getFilm]);

  const [isFilmPlaying, setIsFilmPlaying] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const togglerRef = useRef(null);
  const [filmDuration, setFilmDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00');


  useEffect(() => {
    let $video = null;
    const onReadyToPlay = () => {
      console.log('onReadyToPlay');
      setFilmDuration(getDuration($video));
      onPlayButtonClick($video);
      setIsFilmPlaying(true);
    };
    if (videoRef?.current) {
      console.log('videoRef?.current', videoRef?.current);
      $video = videoRef.current;
      $video.addEventListener('canplay', onReadyToPlay);
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
      $video.addEventListener('playing', () => {
        console.log('playing');
      });
      $video.addEventListener('waiting', () => {
        console.log('waiting');
      });
      $video.addEventListener('stalled', () => {
        console.log('stalled');
      });
      $video.addEventListener('staloadedmetadatalled', () => {
        console.log('staloadedmetadatalled');
      });
      $video.addEventListener('suspend', () => {
        console.log('suspend');
      });
      $video.addEventListener('progress', () => {
        console.log('progress');
      });
      $video.addEventListener('emptied', () => {
        console.log('emptied');
      });
    }
    return () => {
      if ($video) {
        $video.removeEventListener('canplay', onReadyToPlay);
      }
    };
  });

  const progressBarTimerId = useRef(null);

  useEffect(() => {
    progressBarTimerId.current = setInterval(() => {
      if (!videoRef.current) {
        return;
      }
      const currentTime = parseFloat(videoRef.current.currentTime).toFixed(2);
      setTimeElapsed(currentTime);
      progressRef.current.value = currentTime;
      togglerRef.current.style.left =` ${getPercentage(currentTime, filmDuration)}%`;
      setTimeRemaining(formatPlayerTime(filmDuration - parseInt(currentTime, 10), '-'));
    }, 1000);
    return () => {
      clearInterval(progressBarTimerId.current);
    };
  });

  if (!isDataLoaded) {
    return <PlayerSpinner />;
  }

  if (isDataLoaded && !Object.keys(film).length) {
    return <Page404 />;
  }

  const {title, video} = film;

  const $pauseButton = (
    <button
      type="button"
      className="player__play"
      onClick={(evt) => {
        evt.preventDefault();
        onPauseButtonClick(videoRef.current);
        setIsFilmPlaying(false);
      }}
    >
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </button>);

  const $playButton = (
    <button
      type="button"
      className="player__play"
      onClick={(evt) => {
        evt.preventDefault();
        onPlayButtonClick(videoRef.current);
        setIsFilmPlaying(true);
      }}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );

  return (
    <div ref={playerRef} className="player">

      <video
        ref={videoRef}
        className="player__video"
        src={video}
        width="100%"
        height="100%"
        muted={false}
        // preload="auto"
        // autoPlay
        // controls
        onClick={() => {
          if (isFilmPlaying) {
            onPauseButtonClick(videoRef.current);
            setIsFilmPlaying(false);
          } else {
            onPlayButtonClick(videoRef.current);
            setIsFilmPlaying(true);
          }
        }}
      >
        {/* <source src={video} type="video/webm;codecs='vp8, vorbis'"></source>
        <source src={video} type="video/mp4;codecs='avc1.4d002a'"></source> */}
      </video>

      <Link
        to={`${AppRoute.FILMS}/${filmId}`}
        className="btn player__exit"
      >
        Exit
      </Link>

      <div
        className="player__controls"
      >
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              ref={progressRef}
              className="player__progress"
              value="0"
              max={filmDuration}
            />
            <div
              ref={togglerRef}
              className="player__toggler"
              title={formatPlayerTime(parseInt(timeElapsed, 10))}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {timeRemaining}
          </div>
        </div>

        <div className="player__controls-row">

          {isFilmPlaying ? $pauseButton : $playButton}

          <div className="player__name">{title}</div>

          <button
            className="player__full-screen"
            type="button"
            onClick={() => {onFullScreenButtonClick(playerRef.current);}}
            // onClick={() => {onFullScreenButtonClick(videoRef.current);}}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  getFilm: PropTypes.func.isRequired,
  filmId: PropTypes.string.isRequired,
  film: PropTypes.oneOfType([
    filmProp,
    PropTypes.shape({}),
  ]),
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.currentFilm,
  isDataLoaded: !(
    state.isLoading[LoadedData.CURRENT_FILM]
  ),
});

const mapDispatchToProps = (dispatch) => ({
  getFilm(id) {
    dispatch(fetchCurrentFilm(id));
  },
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);

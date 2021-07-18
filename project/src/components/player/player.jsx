import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchCurrentFilm} from '../../store/api-actions';
import {AppRoute} from '../../consts';
import PlayerSpinner from '../player-spinner/player-spinner';
import Page404 from '../page-404/page-404';
import { Link } from 'react-router-dom';
import { getCurrentFilm } from '../../store/film-page/selectors';
import { isCurrentFilmLoading } from '../../store/loading/selectors';
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

const INACTIVE_CONTROLS_HIDING_TIMEOUT = 4000;
const PROGRESSBAR_REFRESHING_INTERVAL = 1000;

function Player({filmId}) {
  const film = useSelector(getCurrentFilm);
  const isDataLoading = useSelector(isCurrentFilmLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentFilm(filmId));
  }, [filmId, dispatch]);

  const [isFilmPlaying, setIsFilmPlaying] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const togglerRef = useRef(null);
  const controlsRef = useRef(null);
  const exitButtonRef = useRef(null);
  const [filmDuration, setFilmDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00');
  const [controlsTimer, setControlsTimer] = useState(null);

  const handleMouseMove = () => {
    if (!controlsRef.current) {
      return;
    }

    const {current: controls} = controlsRef;
    const {current: exitButton} = exitButtonRef;

    if (controlsTimer) {
      clearTimeout(controlsTimer);
    }

    controls.style.display = 'block';
    exitButton.style.display = 'block';

    setControlsTimer(
      setTimeout(() => {
        controls.style.display = 'none';
        exitButton.style.display = 'none';
      }, INACTIVE_CONTROLS_HIDING_TIMEOUT),
    );
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    let $video = null;

    const onCanplay = () => {
      setFilmDuration(getDuration($video));
      onPlayButtonClick($video);
      setIsFilmPlaying(true);
    };

    $video = videoRef.current;
    $video.addEventListener('canplay', onCanplay);

    return () => {
      if ($video) {
        $video.removeEventListener('canplay', onCanplay);
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
    }, PROGRESSBAR_REFRESHING_INTERVAL);
    return () => {
      clearInterval(progressBarTimerId.current);
    };
  }, [setTimeElapsed, setTimeRemaining, filmDuration]);

  if (isDataLoading) {
    return <PlayerSpinner />;
  }

  if (!isDataLoading && !Object.keys(film).length) {
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
    <div
      ref={playerRef}
      className="player"
      onMouseMove={handleMouseMove}
    >

      <video
        ref={videoRef}
        className="player__video"
        src={video}
        width="100%"
        height="100%"
        muted={false}
        onClick={() => {
          if (isFilmPlaying) {
            onPauseButtonClick(videoRef.current);
            setIsFilmPlaying(false);
          } else {
            onPlayButtonClick(videoRef.current);
            setIsFilmPlaying(true);
          }
        }}
      />

      <Link
        ref={exitButtonRef}
        to={`${AppRoute.FILMS}/${filmId}`}
        className="btn player__exit"
      >
        Exit
      </Link>

      <div
        ref={controlsRef}
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
  filmId: PropTypes.string.isRequired,
};

export default Player;

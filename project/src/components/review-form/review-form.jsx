import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {postComment} from '../../store/api-actions';
import {nullifyNewCommentErrorCode} from '../../store/action';
import ErrorMessage from '../error-message/error-message';
import {getNewCommentErrorCode} from '../../store/film-page/selectors';

const MINIMUM_COMMENT_LENGTH = 50;
const MAXIMUM_COMMENT_LENGTH = 400;
const RATING_STARS_COUNT = 10;

function ReviewForm({filmId}) {
  const errorCode = useSelector(getNewCommentErrorCode);

  const dispatch = useDispatch();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  function handleRatingInputClick(evt) {
    setRating(evt.target.value);
  }

  function handleTextareaChange(evt) {
    setComment(evt.target.value);
  }

  useEffect(() => {
    dispatch(nullifyNewCommentErrorCode());
  }, [dispatch]);

  useEffect(() => {
    if ((comment.length >= MINIMUM_COMMENT_LENGTH)
      && (comment.length <= MAXIMUM_COMMENT_LENGTH) && rating) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [comment, rating]);

  function handleFormSubmit(evt) {
    evt.preventDefault();

    if (!isReadyToSubmit) {
      return;
    }

    setIsReadyToSubmit(false);
    dispatch(postComment(filmId, {rating, comment}));
  }

  const $ratingStars = new Array(RATING_STARS_COUNT).fill('raiting_star').map((_star, index) => {
    const starRating = String(RATING_STARS_COUNT - index);
    return (
      <React.Fragment key={`star-${starRating}`}>
        <input
          className="rating__input"
          id={`star-${starRating}`}
          type="radio"
          name="rating"
          value={starRating}
          onChange={handleRatingInputClick}
          checked={rating === starRating}
        />
        <label
          className="rating__label"
          htmlFor={`star-${starRating}`}
        >
          {`Rating ${starRating}`}
        </label>
      </React.Fragment>
    );});

  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={handleFormSubmit}
    >
      <div className="rating">
        <div className="rating__stars">
          {$ratingStars}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleTextareaChange}
          value={comment}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!isReadyToSubmit}
          >
            Post
          </button>
        </div>
      </div>
      {errorCode ? <ErrorMessage errorCode={errorCode} /> : ''}
    </form>
  );
}

ReviewForm.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default ReviewForm;

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {postComment} from '../../store/api-actions';
import {nullifyNewCommentErrorCode} from '../../store/action';
import ErrorMessage from '../error-message/error-message';
import {getNewCommentErrorCode} from '../../store/film-page/selectors';


function ReviewForm({filmId}) {
  const errorCode = useSelector(getNewCommentErrorCode);

  const dispatch = useDispatch();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  function onRatingInputClick(evt) {
    setRating(evt.target.value);
  }

  function onTextareaChange(evt) {
    setComment(evt.target.value);
  }

  useEffect(() => {
    dispatch(nullifyNewCommentErrorCode());
  }, [dispatch]);

  useEffect(() => {
    if ((comment.length >= 50) && (comment.length <= 400) && rating) {
      setIsReadyToSubmit(true);
    } else {
      setIsReadyToSubmit(false);
    }
  }, [comment, rating]);

  function onSubmit(evt) {
    evt.preventDefault();

    if (!isReadyToSubmit) {
      return;
    }

    setIsReadyToSubmit(false);
    dispatch(postComment(filmId, {rating, comment}));
  }


  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={onSubmit}
    >
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10" onChange={onRatingInputClick} checked={rating === '10'} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" value="9" onChange={onRatingInputClick} checked={rating === '9'} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" value="8" onChange={onRatingInputClick} checked={rating === '8'} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={onRatingInputClick} checked={rating === '7'} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={onRatingInputClick} checked={rating === '6'} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={onRatingInputClick} checked={rating === '5'} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={onRatingInputClick} checked={rating === '4'} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={onRatingInputClick} checked={rating === '3'} />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={onRatingInputClick} checked={rating === '2'} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={onRatingInputClick} checked={rating === '1'} />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={onTextareaChange}
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

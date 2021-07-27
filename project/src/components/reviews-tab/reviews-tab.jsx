import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import Spinner from '../spinner/spinner';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFilmComments} from '../../store/api-actions';
import {getCurrentFilmComments} from '../../store/film-page/selectors';
import {isFilmCommentsLoading} from '../../store/loading/selectors';

function ReviewsTab({filmId}) {
  const comments = useSelector(getCurrentFilmComments);
  const isDataLoading = useSelector(isFilmCommentsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilmComments(filmId));
  }, [filmId, dispatch]);

  useEffect(() => {
    if (isDataLoading) {
      return <Spinner />;
    }
  }, [isDataLoading]);

  const $comments = comments.map((review) => (
    <Review
      review={review}
      key={String(review.user.id) + review.date}
    />),
  );

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {$comments.filter((_, ind) => !(ind % 2))}
      </div>
      <div className="film-card__reviews-col">
        {$comments.filter((_, ind) => (ind % 2))}
      </div>
    </div>
  );
}

ReviewsTab.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default ReviewsTab;

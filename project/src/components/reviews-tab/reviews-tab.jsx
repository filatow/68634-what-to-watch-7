import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import Spinner from '../spinner/spinner';
import {useSelector} from 'react-redux';
import {isFilmCommentsLoading} from '../../store/loading/selectors';
import reviewProp from '../review/review.prop';
import {getFilmCommentsErrorCode} from '../../store/film-page/selectors';
import ErrorMessage from '../error-message/error-message';
import './reviews-tab.css';

function getErrorCaseMarkup(errorCode) {
  return (
    <h3 className="film-card__reviews-error">
      <div className="film-card__reviews-error-heading">
        Reviews cannot be presented now. <br />
        Something went wrong...
      </div>
      <ErrorMessage errorCode={errorCode} />
    </h3>);
}

function ReviewsTab({comments}) {
  const isDataLoading = useSelector(isFilmCommentsLoading);
  const errorCode = useSelector(getFilmCommentsErrorCode);

  if (isDataLoading) {
    return <Spinner />;
  }

  const $comments = comments.map((review) => (
    <Review
      review={review}
      key={String(review.user.id) + review.date}
    />),
  );

  if (errorCode) {
    return getErrorCaseMarkup(errorCode);
  }

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
  comments: PropTypes.arrayOf(reviewProp).isRequired,
};

export default ReviewsTab;

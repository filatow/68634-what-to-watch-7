import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import reviewProp from '../review/review.prop';
import Review from '../review/review';
import Spinner from '../spinner/spinner';
import {connect} from 'react-redux';
import {fetchFilmComments} from '../../store/api-actions';
import { getCurrentFilmComments } from '../../store/film-page/selectors';
import { isFilmCommentsLoading } from '../../store/loading/selectors';

function ReviewsTab({filmId, isDataLoading, comments, getFilmReviews}) {

  useEffect(() => {
    getFilmReviews(filmId);
  }, [filmId, getFilmReviews]);

  if (isDataLoading) {
    return <Spinner />;
  }

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
  comments: PropTypes.arrayOf(reviewProp).isRequired,
  getFilmReviews: PropTypes.func.isRequired,
  isDataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  comments: getCurrentFilmComments(state),
  isDataLoading: isFilmCommentsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFilmReviews(filmId) {
    dispatch(fetchFilmComments(filmId));
  },
});

export {ReviewsTab};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsTab);

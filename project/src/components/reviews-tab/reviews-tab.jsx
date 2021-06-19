import React from 'react';
import PropTypes from 'prop-types';
import reviewProp from '../review/review.prop';
import Review from '../review/review';

function ReviewsTab({filmId, reviews}) {
  const filmReviews = reviews.filter((review) => review.id === filmId);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {filmReviews.map((review) => (
          <Review
            review={review}
            key={String(review.user.id) + review.date}
          />))}
      </div>
    </div>
  );
}

ReviewsTab.propTypes = {
  filmId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default ReviewsTab;

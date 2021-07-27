import React, {useState, useEffect} from 'react';
import filmProp from '../film/film.prop';
import OverviewTab from './../overview-tab/overview-tab';
import DetailsTab from './../details-tab/details-tab';
import ReviewsTab from './../reviews-tab/reviews-tab';
import reviews from '../../mocks/reviews';

const TAB_NAMES = ['Overview', 'Details', 'Reviews'];

function FilmTabs({film}) {
  const [activeTab, setActiveTab] = useState(TAB_NAMES[0]);
  const $tabs = TAB_NAMES.map((tabName) => (
    <li
      className={`film-nav__item ${tabName === activeTab ? 'film-nav__item--active' : ''}`}
      key={tabName}
    >
      <a
        href="#/"
        className="film-nav__link"
        onClick={(evt) => {
          evt.preventDefault();
          setActiveTab(tabName);
        }}
      >
        {tabName}
      </a>
    </li>
  ));

  useEffect(() => {
    setActiveTab(TAB_NAMES[0]);
  }, [film]);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {$tabs}
        </ul>
      </nav>
      {activeTab === TAB_NAMES[0] && <OverviewTab film={film} />}
      {activeTab === TAB_NAMES[1] && <DetailsTab film={film} />}
      {activeTab === TAB_NAMES[2] && <ReviewsTab filmId={film.id} comments={reviews} />}
    </>
  );
}

FilmTabs.propTypes = {
  film: filmProp,
};

export default FilmTabs;


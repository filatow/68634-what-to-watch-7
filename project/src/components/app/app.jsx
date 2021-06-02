import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';

function App(props) {
  const {title, genre, year} = props;

  return (
    <Main
      title={title}
      genre={genre}
      year={year}
    >
    </Main>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  year: PropTypes.number.isRequired,
};

export default App;

import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';
import { Modal } from './components/Modal';
import { TRENDING_API, SEARCH_API } from './api/movieDB';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [movieClicked, setMovieClicked] = useState('');

  useEffect(() => {
    getMovies(TRENDING_API);
  }, []);

  const getMovies = (API) => {

    fetch(API)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
  }

  const handleSearchButton = async (e) => {
    e.preventDefault();

    if (searchText && searchText !== '') {
      await getMovies(SEARCH_API + searchText);
      await setSearchText('');
    }
    else {
      getMovies(TRENDING_API);
    }

  }

  const handleOnClickMovie = (movie, poster) => {
    //movie.prototype.finalPoster = poster;
    const movieWithPosterSrc = { ...movie, finalPoster: poster };
    setMovieClicked(movieWithPosterSrc);
  }

  const onClickModalContainer = () => {
    console.log('Hi found modal container outside if');
    setMovieClicked(null);
  }

  return (
    <div className="App">
      <header>
        <form onSubmit={handleSearchButton}>
          <div onClick={handleSearchButton}>
            <h1 className="brandName" >Prime<span className="brandName2">TIME</span></h1>
          </div>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText} />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && movies.map(movie => <Movie key={movie.id} movieData={movie} handleOnMovieClick={handleOnClickMovie} />)}
      </div>
      {movieClicked && <div className="modal_container">
        <Modal movie={movieClicked} onClickModalContainer={onClickModalContainer} />
      </div>}
    </div>
  );
}

export default App;

import React, { useEffect, useState} from 'react';
import Movie from './components/Movie';
import {TRENDING_API, SEARCH_API} from "./api/movieDataBase";
import { Modal } from './components/Modal';


function App() {

  const [ movies, setMovies] = useState( [] );
  const [ searchTerm, setSearchTerm] = useState(' ');
  const [movieClicked, setMovieClicked] = useState();

  useEffect(() =>{
    fetchMoviesFromApi(TRENDING_API);
  },[]);

  const fetchMoviesFromApi = (API) =>{
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      })

  } 

  const handleOnSubmit = (e) =>{
    e.preventDefault();

    if(searchTerm && searchTerm !== ' '){
       fetchMoviesFromApi(SEARCH_API + searchTerm);
       setSearchTerm('');
    }
    else{
      fetchMoviesFromApi(TRENDING_API);
    }

  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleOnClickMovie = (movie, poster) => {
    
    const movieWithPosterSrc = { ...movie, finalPoster: poster };
    setMovieClicked(movieWithPosterSrc);
  }

  const onClickModalContainer = () => {
   
    setMovieClicked(null);
  }

 

  return (
    <div>
      <header>

        <form onSubmit = {handleOnSubmit}>
          <div>
            <h1 className="brandName" >Movie<span className="brandName2">TIME</span></h1>
          </div>
          
          <input 
            className = "search-box"
            type = "search"
            placeholder = "Search..." 
            value = {searchTerm}
            onChange = {handleOnChange} />

        </form>
        
      </header>

      <div className = "movie-container">
        {movies.length > 0 && movies.map(movie => (
        <Movie key = {movie.id} movieData = {movie} handleOnMovieClick={handleOnClickMovie} />  
        ))}

      </div>

      {movieClicked && <div className="modal_container">
        <Modal movie={movieClicked} onClickModalContainer={onClickModalContainer} />
      </div>}

    </div> 
  );
}

export default App;

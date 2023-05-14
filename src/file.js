import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  async function fetchMoviesList() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://swapi.dev/api/film/");
      if(!response.ok) {
        throw new Error('Something Went Wrong');
      }
      const data = await response.json(); // return promise
      
     
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    }
     catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  let content = <p>Found No Movies.</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  
  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesList}>Fetch Movies</button>
      </section>
      <section>
      {content}
        {/* {!isLoading && movies.length > 0 }
        {!isLoading && movies.length === 0 && !error && <p>Found No Movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;

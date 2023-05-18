import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Addmovie from "./components/Addmovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesList = useCallback(async function () {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://movie-fetch-f6002-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json(); // return promise
      console.log('data',data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log('loadedMovies', loadedMovies)
      // const transformedMovies = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesList();
  }, [fetchMoviesList]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movie-fetch-f6002-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
        
      },
    );
    const data = await response.json();
    console.log('movie',data);
  }
  // const memoziedMovieList = useMemo(
  //   () => <MoviesList movies={movies} />,
  //   [movies]
  // );

  async function deleteMovieHandler(movie) {
    console.log('deleteMovieHandler', movie);
    try {
      const response = await fetch(
        `https://movie-fetch-f6002-default-rtdb.firebaseio.com/movies/${movie}.json`,
        {
          method: "DELETE",
        }
      );
      
      const data = await response.json();
      // console.log(data);
      if(!response.ok) {
        throw new Error("Failed to delete movie.",data.message);
      }
      setMovies((preMovies) => preMovies.filter((m) => m.id !== movie));
    } catch (error) {
      setError(error.message);
    }
  }
  let content = <p>Found No Movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList onDelete={deleteMovieHandler} movies={movies} />;
    // content = memoziedMovieList;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <Addmovie onAddMovie={addMovieHandler} onDeleteMovie={deleteMovieHandler} />
      </section>
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

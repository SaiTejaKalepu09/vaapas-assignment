import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className='row'>
      {movies.map((movie) => (
        <MovieCard key={movie.key} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

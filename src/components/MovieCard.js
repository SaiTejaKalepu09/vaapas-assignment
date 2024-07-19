import React from 'react';
import './components.css';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card col-6'>
      <h2 className='title'>{movie.title}</h2>
      <p className='author'>{movie.author_name ? movie.author_name.join(', ') : 'Unknown Author'}</p>
      {movie.publish_date ? <p className='date'>Publish Date: {movie.publish_date}</p> : null}
      <div className="card-hover">
        <img src={movie.dogImage} alt="Random Dog" className="dog-image" />
      </div>
    </div>
  );
};

export default MovieCard;

import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: false,
      firstPage: true,
    };
  }

  fetchMovies = async (query) => {
    this.setState({ loading: true });

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (data.docs.length === 0) {
        throw new Error('No movies found');
      }

      const moviesWithDogs = await Promise.all(
        data.docs.map(async (movie) => {
          const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random');
          if (!dogResponse.ok) {
            throw new Error('Failed to fetch dog image');
          }
          const dogData = await dogResponse.json();
          return { 
            ...movie, 
            dogImage: dogData.message,
            subject: movie.subject ? movie.subject.join(', ') : null,
            publish_date: movie.first_publish_year || null
          };
        })
      );
      this.setState({ movies: moviesWithDogs, loading: false });
    } catch (error) {
      alert(error.message);
      this.setState({ loading: false });
    }
  };

  handleGetStarted = () => {
    this.setState({ firstPage: false });
  };

  render() {
    const { movies, loading, firstPage } = this.state;

    return (
      <div className='app-container'>
        <div className='background' />
        <div className='content'>
          {firstPage ? (
            <div className='firstPage'>
              <h1 className='heading'>Vaapas Video</h1>
              <h1 className='heading2'>Unlimited Movies, TV shows and more. . .</h1>
              <button onClick={this.handleGetStarted} className='button'>Get Started</button>
            </div>
          ) : (
            <div className='secondPage'>
              <h1 className='heading'>Search for Movies</h1>
              <SearchBar onSearch={this.fetchMovies} />
              {loading && <div className="loader" />}
              <p className='hover'>*Hover on the card for Dog image..</p>
              <MovieList movies={movies} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

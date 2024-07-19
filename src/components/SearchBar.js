import React, { Component } from 'react';
import './components.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query } = this.state;
    if (query.trim() === '') {
      alert('Please enter a search query');
      return;
    }
    this.props.onSearch(query);
  };

  render() {
    return (
      <div className='searchBar'>
        <input
          className='searchInput'
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search movies, shows..."
        />
        <button onClick={this.handleSearch} className='search-button'>Search</button>
      </div>
    );
  }
}

export default SearchBar;

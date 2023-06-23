import React from 'react';
import "./Main.css";
import MovieList from '../components/MovieList'
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
    count: 0
  }

  componentDidMount() {
    fetch('https://www.omdbapi.com/?apikey=6c9a7638&s=BBC')
      .then(responce => responce.json())
      .then(data => this.setState({ movies: data.Search, loading: false, count: data.totalResults }))
  }

  searchMovies = (str, type='all', page) => {
    this.setState({ loading: true})
    fetch(`https://www.omdbapi.com/?apikey=6c9a7638&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
      .then(responce => responce.json())
      .then(data => this.setState({ movies: data.Search, loading: false, count: data.totalResults }))
  }

  render() {
    const {movies, loading, count} = this.state;
    return (
      <div className="main">
      <Search searchMovies={this.searchMovies} totalCount={count}/>
      
        <div className="wrap">
          {
            loading ? <Preloader /> : <MovieList movies={movies}/> 
          }
        </div>
      </div>
    )
  }
}

export default Main;
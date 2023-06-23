import './MovieList.css';
import Movie from './Movie';

function MovieList (props) {

  const {movies = []} = props; 

  // console.log(movies)
  return(
    <div className="movies">
      {
        movies.length ? movies.map(movie => {
          return <Movie key={movie.imdbID} {...movie}/>
        }) : <h4>Ничего не найдено</h4>
      }
    </div>
  )
}

export default MovieList
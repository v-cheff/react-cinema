import React from 'react'
import './Search.css'

class Search extends React.Component {
  state= {
    search: "",
    type: 'all',
    page : 1
  }

  handleKey = (event) => {
    if(event.key === 'Enter') {
      this.props.searchMovies(this.state.search, this.state.type)
    }
  }
  
  handlerFilter = (event) => {
    this.setState(
      () => ({type: event.target.dataset.type}),
      () => {this.props.searchMovies(this.state.search, this.state.type)}
    )
  }

  prevPage = () => {
    this.setState(
      () => (this.state.page > 1 ? {page: this.state.page - 1} : {page: 1}),
      () => {this.props.searchMovies(this.state.search, this.state.type, this.state.page)})
  }
  nextPage = () => {
    this.setState(
      () => ({page: this.state.page + 1}),
      () => {this.props.searchMovies(this.state.search, this.state.type, this.state.page)})
  }

  setPage = (num) => {
    this.setState(
      () => ({page: num}),
      () => {this.props.searchMovies(this.state.search, this.state.type, this.state.page)}
    )
  }


  render() {
    let limit = 10;
    let totalPages = Math.ceil(this.props.totalCount / limit);

    let lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page + limit;
    let firstIndex = totalPages <= 10 ? lastIndex - limit + lastIndex + 1 : lastIndex - limit;

    let num = [];
    for(let i = 0; i < totalPages+1; i++) {
      num.push(i);
    }
    return(
      <>
      <div className="search">
        <input type="search" placeholder='search'
        value={this.state.search}
        onChange={(event) => this.setState({search: event.target.value})}
        onKeyDown={this.handleKey}/>
        <button 
        className="btn" 
        onClick={() => this.props.searchMovies(this.state.search, this.state.type)}
        >Search</button>
      </div>
      <div className="radio">
        <input type="radio" name='type' data-type="all" checked={this.state.type === "all"} onChange={this.handlerFilter}/> <span>All</span>
        <input type="radio" name='type' data-type="movie" checked={this.state.type === "movie"} onChange={this.handlerFilter}/> <span>Movies only</span>
        <input type="radio" name='type' data-type="series" checked={this.state.type === "series"} onChange={this.handlerFilter}/> <span>Series only</span>
        <input type="radio" name='type' data-type="game" checked={this.state.type === "game"} onChange={this.handlerFilter}/> <span>Games only</span>
      </div>
      <div className="navigation">
        <button className="btn" onClick={this.prevPage}>
          Previous page
        </button>

        <div className="items">
          {
            num.slice(firstIndex, lastIndex).map((el,index) => (
              <button 
                className="btn"
                key={index}
                style={{ background: this.state.page !== el ? "gray": ''}}
                onClick={() => (this.setPage(el))}
              >
                {el}
              </button>
            ))
          }
        </div>

        <button className="btn" onClick={this.nextPage}>
          Next page
        </button>
      </div>
      </>
    )
  }
}

export default Search;
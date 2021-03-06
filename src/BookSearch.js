import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends Component {

  state = {
    shelvedBooks: this.props.bookShelves,
    results: [],
  }

  updateQuery = (query) => {
    BooksAPI.search(query)
    .then((results) => {
      if(Array.isArray(results) && results !== undefined) {
        results = results.filter((book) => book.imageLinks !== undefined);
        this.setState({ results: results });
      } else if (results !== undefined && results.error === 'empty query') {
        this.clearResults();
      }
    })
  }

  clearResults = () => {
    this.setState({ results: [] });
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              onChange={(e) => {
                this.clearResults()
                this.updateQuery(e.target.value)
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map( (book) => (
                <li key={ book.id }>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={
                            (this.props.books.filter((shelvedBook) => shelvedBook.id === book.id).length > 0) ? (
                              this.props.books.filter((shelvedBook) => shelvedBook.id === book.id)[0].shelf
                            ):("None")
                          } onChange={(e) => this.props.bookShelfUpdate(e, book) }>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                  </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch

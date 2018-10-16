import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookPreview from './BookPreview'

class BookShelf extends Component {


  state = {
    currentBook: 0,

    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {

    return (
      <main>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.state.books.filter( (book) => book.shelf === 'currentlyReading').map( (book) => (
                      <li key={ book.id }>
                        <div className="book" onClick={() => this.setState({ currentBook: book })}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onClick={(e) => {
                                  BooksAPI.update(book, `${e.target.value}`).then(this.componentDidMount())
                                }}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                     this.state.books.filter( (book) => book.shelf === 'wantToRead').map( (book) => (
                      <li key={ book.id }>
                        <div className="book" onClick={() => this.setState({ currentBook: book })}>
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onClick={(e) => {
                                  BooksAPI.update(book, `${e.target.value}`).then(this.componentDidMount())
                                }}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.state.books.filter( (book) => book.shelf === 'read').map( (book) => (
                      <li key={ book.id }>
                        <div className="book" onClick={() => this.setState({ currentBook: book })}>
                          <div className="book-top">
                            <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onClick={(e) => {
                                  BooksAPI.update(book, `${e.target.value}`).then(this.componentDidMount())
                                }}>
                                <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="book-preview">
          <BookPreview
            focusedBook={this.state.currentBook}
            onUpdate={(book, value) => {
              BooksAPI.update(book, `${value}`).then(this.componentDidMount())
            }} />
        </div>
      </main>
    )
  }
}

export default BookShelf

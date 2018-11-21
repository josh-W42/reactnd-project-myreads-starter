import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookPreview from './BookPreview'

class BookShelf extends Component {


  state = {
    currentBook: 0,
    books: [],
    bookShelves: this.props.bookShelves,
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let bookShelves = [
        {
          shelf: 'currentlyReading',
          name: 'Currently Reading Books',
          books: [],
        },
        {
          shelf: 'wantToRead',
          name: 'Books I Want to Read',
          books: [],
        },
        {
          shelf: 'read',
          name: 'Books I Have Read',
          books: [],
        }
      ];

      bookShelves.forEach((bookShelf) => {
        books.filter((book) => book.shelf === bookShelf.shelf).forEach((book) => {
          bookShelf['books'].push(book);
        });
      });

      this.setState({ bookShelves, books });
      this.props.intialization(bookShelves, books);
    });
  }

  render() {

    return (
      <main>
        <div className="list-books-content">
          <div>
            {
              this.state.bookShelves.map((bookShelf) => (
                <div className="bookshelf" key={bookShelf.shelf}>
                  <h2 className="bookshelf-title">{bookShelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        bookShelf.books.map( (book) => (
                          <li key={ book.id }>
                            <div className="book" onClick={() => this.setState({ currentBook: book })}>
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => { this.props.bookShelfUpdate(e, book) }}>
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
              ))
            }
          </div>
        </div>
        <div className="book-preview">
          <BookPreview
            focusedBook={this.state.currentBook}
            onUpdate={(e, book) => this.props.bookShelfUpdate(e, book) } />
        </div>
      </main>
    )
  }
}

export default BookShelf

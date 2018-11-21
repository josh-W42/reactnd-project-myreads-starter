import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {

  state = {
    screen: 'shelf',
    bookShelves: [],
    books: [],
  }

  onShelfUpdate(e, book, updateType) {
    BooksAPI.update(book, `${e.target.value}`);

    if(updateType === 'bookshelf') {
      let BookShelfBooks = this.state.bookShelves.filter((bookShelf) => bookShelf.shelf === book.shelf)[0]['books'];

      const bookIndex = BookShelfBooks.indexOf(book);
      BookShelfBooks.splice(bookIndex, 1);
    }

    book.shelf = e.target.value;
    this.state.bookShelves.filter((bookShelf) => bookShelf.shelf === book.shelf)[0]['books'].push(book);
  }

  render() {
    return (
      <div className="app">
        <Route path="/search"
          render={() => (
            <BookSearch
              books={this.state.books}
              bookShelves={this.props.bookShelves}
              bookShelfUpdate={ (e, book) => this.onShelfUpdate(e, book)}
               />
          )} />
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookShelf
                bookShelves={this.state.bookShelves}
                intialization={(bookShelves, books) => this.setState({ bookShelves, books })}
                bookShelfUpdate={ (e, book) => this.onShelfUpdate(e, book, 'bookshelf')}
              />
              <div className="open-search">
                <Link className="close-create-contact" to="/search">Add a book</Link>
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp

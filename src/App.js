import React, { Component } from 'react'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
        {document.location.pathname === '/search' ? (
          <BookSearch />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf />
            <div className="open-search">
              <a onClick={() => document.location.pathname = '/search'}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

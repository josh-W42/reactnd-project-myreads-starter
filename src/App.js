import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {

  state = {
    screen: 'shelf',
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <BookSearch
            />
          )}
        />
        <Route exact path="/" render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookShelf
                onNavigate={() => {
                  this.setState({ screen: 'search' })
                  history.push('/')
                }}
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

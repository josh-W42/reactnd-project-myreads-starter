import React, { Component } from 'react'

class BookPreview extends Component {

  render() {
    let book = this.props.focusedBook;

    return (
      <div>
        { book !== 0 && (
          <div key={ book.title } className="book">
            <div className="book-top">
              <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            </div>
            <div className="book-info">
              <h2>Title</h2>
              <div className="book-title">{book.title}</div>
              <h2>Author(s)</h2>
              <div className="book-authors">{book.authors}</div>
            </div>
            <h2>Description</h2>
            <div className="book-description">{book.description}</div>
          </div>
        )}
      </div>
    )
  }
}

export default BookPreview

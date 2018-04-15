import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

function BookList(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {props.shelves.map(shelf => (
            <BookShelf
              key={shelf.key}
              name={shelf.name}
              books={props.books.filter(book => book.shelf === shelf.key)}
              onChange={props.onChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

BookList.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

BookList.defaultProps = {
  books: []
};

export default BookList;
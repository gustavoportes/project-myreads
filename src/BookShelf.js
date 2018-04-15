import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book =>
            <BookItem key={book.id} book={book} onChange={props.onChange} />
          )}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

BookShelf.defaultProps = {
  books: []
};

export default BookShelf;
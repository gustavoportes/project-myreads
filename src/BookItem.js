import React from 'react';
import PropTypes from 'prop-types';
import BookControl from './BookControl';
import BookInfo from './BookInfo';

function BookItem(props) {
  
  const handleChange = (shelf) => {
    props.onChange(props.book, shelf);
  };
  
  const imageURL = props.book.imageLinks ?
    (props.book.imageLinks.smallThumbnail ? props.book.imageLinks.smallThumbnail :''):'';

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{ width: 128, height: 193, backgroundImage: `url(${imageURL})` }}>
          </div>
          <BookControl shelf={props.book.shelf} onChange={handleChange} />
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors && (props.book.authors.join(', '))}</div>
        <BookInfo book={props.book} />
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BookItem;
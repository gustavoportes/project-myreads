import React from 'react';
import PropTypes from 'prop-types';

function BookControl(props) {

  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={props.shelf} onChange={handleChange}>
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookControl.propTypes = {
  shelf: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BookControl;
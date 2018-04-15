import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class BookInfo extends Component {

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const book = this.props.book;
    const { open } = this.state;

    const styleButton = {
      color: '#2e7c31'
    };

    const labelButton = {
      textTransform: 'capitalize',
      fontSize: '0.8em'
    };

    const actions = [
      <FlatButton
        label="Ok"
        keyboardFocused={true}
        onClick={this.handleClose}
        style={styleButton}
      />,
    ];

    return (
      <div>
        <FlatButton
          label="More Info"
          className="book-more-info"
          onClick={this.handleOpen}
          style={styleButton}
          labelStyle={labelButton}
        />
        { open && ( 
          <Dialog
            title={book.title}
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <div className="book-info">
              <p>{book.description}</p>
              <p><strong>Author(s):</strong> {book.authors && (book.authors.join(', '))}</p>
              <p><strong>Pages:</strong> {book.pageCount ? book.pageCount : 0}</p>
              <a href={book.previewLink} className="btn" target="_blank" rel="noopener noreferrer">More information</a>
            </div>          
          </Dialog>
        )}
      </div>
    );
  }
}

BookInfo.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookInfo;
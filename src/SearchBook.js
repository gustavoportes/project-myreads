import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import CircularProgress from 'material-ui/CircularProgress';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';

class SearchBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchBook: [],
      query: '',
      isLoaded: true,
      isEmpty: false
    };
    this.updateSearchBookDebounced = debounce(this.updateSearchBook,1000);
  }

  updateQuery = (event) => {
    const query = event.target.value;
    this.setState(
      { 
        query, 
        isLoaded: false, 
        isEmpty: false, 
        searchBook: [] 
      }
    );
    this.updateSearchBookDebounced(query);
  }

  updateSearchBook = (query) => {
    query = query.replace(/\s\s+/g,' ').trim();
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.length) {
          this.setState({ searchBook: books.map(item => {
            const bookShelf = this.props.booksShelves.find( bookShelf => bookShelf.id === item.id );
            item.shelf = bookShelf ? bookShelf.shelf : 'none';
            return item;
          }), isLoaded: true });
        } else {
          this.setState(
            { 
              searchBook: [], 
              isLoaded: true, 
              isEmpty: true 
            }
          );
        }
      });
    } else {
      this.setState({ searchBook: [] });
      this.setState(
        { 
          searchBook: [], 
          isLoaded: true, 
          isEmpty: false 
        }
      );
    }
  }

  handleChange = (book,shelf) => {
    this.props.onChange(book,shelf);
    this.setState(state => ({
      searchBook: state.searchBook.map(item => {
        if (item.id === book.id) {
          item.shelf = shelf;
        }
        return item;
      })
    }));
  }

  render() {
    const { searchBook, query, isLoaded, isEmpty } = this.state;

    const listBooks = searchBook.map( book =>
      <BookItem key={book.id} book={book} onChange={this.handleChange} />
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          { !isLoaded && (
            <CircularProgress color="#2e7d31" size={25} thickness={4} />            
          )}
          { listBooks.length > 0 && (
            <div>
              <p><b>{listBooks.length}</b> results</p>
              <ol className="books-grid">
                {listBooks}
              </ol>
            </div>
          )}
          { isEmpty && (
            <div>
              <p>0 results</p>
              <p>No results found for your query.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  booksShelves: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

SearchBook.defaultProps = {
  booksShelves: []
};

export default SearchBook;
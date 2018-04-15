import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import SearchBook from './SearchBook';

class App extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      if(books.length){
        this.setState({ books });
      }
    });
  }

  handleChange = (book,shelf) => {
    BooksAPI.update(book,shelf).then(data => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(item => item.id !== book.id).concat( [book] )
      }));
    });
  }

  render() {
    const books = this.state.books;
    const shelves = [
      {
        key: 'currentlyReading', 
        name: 'Currently Reading'
      },
      { key: 'wantToRead', 
        name: 'Want to Read'
      },
      { key: 'read', 
        name: 'Read'
      }
    ];

    return (
      <MuiThemeProvider>
        <div className="app">
          <Route exact path="/" render = {() => (
            <BookList books={books} shelves={shelves} onChange={this.handleChange} />
          )}/>
          <Route exact path="/search" render = {() => (
            <SearchBook booksShelves={books} onChange={this.handleChange} />
          )}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
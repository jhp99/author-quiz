import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';


const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Adventures of Huckleberry Finn'
        ]
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Helmet',
            'Macbeth',
            'Romeo and Juliet'
        ]
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'David Cooperfield',
            'A Tail of Two cities'
        ]
    },
    {
        name: 'J. K. Rowling',
        imageUrl: 'images/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Harry Potter and the Sorceres Stone'
        ]
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Shining',
            'IT'
        ]
    }

];


const getTurnData = (authors) => {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => 
                title === answer))
    }
}

const reducer = (
  state = { authors, turnData: getTurnData(authors), highlight: '' }, 
  action) => {
    switch (action.type) {
      case 'ANSWER_SELECTED':
        const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
        return Object.assign(
          {}, 
          state, { 
            highlight: isCorrect ? 'correct' : 'wrong'
          });
      case 'CONTINUE': 
          return Object.assign({}, state, { 
            highlight: '',
            turnData: getTurnData(state.authors)
          });
      case 'ADD_AUTHOR':
          return Object.assign({}, state, {
            authors: state.authors.concat([action.author])
          });
      default: return state;
    }
}

let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();

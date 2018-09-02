import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';


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

const resetState = () => {
    return {
        turnData : getTurnData(authors),
        highlight: ' '
     };
}

const getTurnData = (authors) => {
    const allBooks = authors.reduce(function(previous,current,index){
        return previous.concat(current.books);
    },[]);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title)=> title === answer))
    }
}
let state = resetState();

const onAnswerSelected = (answer) => {
    const isCorrect = state.turnData.author.books.some((book) =>  book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}


const App = () => {
    return <AuthorQuiz {...state} 
            onAnswerSelected={onAnswerSelected} 
            onContinue={() => {
                state = resetState();
                render();
                }
        }/>;
}

const AuthorWrapper = withRouter(({ history }) => {
    return <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
        }} />
});

const render = () => {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}></Route>
            <Route path="/add" component={AuthorWrapper}></Route>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

render();
registerServiceWorker();

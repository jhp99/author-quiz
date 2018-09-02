import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Link } from 'react-router-dom';

const Hero = () =>{
  return(
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1> Author Quiz </h1>
        <p> Select the book written by th authoe shown </p>
      </div>
    </div>
  )
}

const Turn = ({author, books, highlight, onAnswerSelected}) =>{
  const highlightToBgColor = (highlight) => {
    const mapping = {
      'none' : ' ',
      'correct' : 'green',
      'wrong' : 'red'
    };
    return mapping[highlight];
  }    
  return(    
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author"></img>
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </div>
  )
}

const Book = ({title, onClick}) => {
  return(
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  )
}
const Continue = ({ show, onContinue}) =>{
  return(
    <div className="row continue">
      {
        show ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>
            Continue
          </button>
        </div>
        : null
      }
    </div>
  )
}

const Footer = () => {
  return(
    <div className="row">
      <div className="col-12">
        <p className="text-muted credit" >
          All imeges are from <a href="https://commons.wikimedia.org/wiki/Main_Page"> Wikemedia Comman</a> are and in the public domain
        </p>
      </div>
    </div>
  )
} 

Turn.prototype  = {
  author: PropTypes.shape({
    name:PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};


const AuthorQuiz = ({turnData, highlight, onAnswerSelected, onContinue}) => {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p> <Link  to="/add"> Add an Author </Link> </p>
        <Footer />
      </div>
    );
  }

export default AuthorQuiz;

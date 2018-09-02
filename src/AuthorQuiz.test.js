import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['Helmet', 'Macbeth', 'Romeo and Juliet', 'The Adventures of Huckleberry Finn'],
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Huckleberry Finn']
    }
  },
  highlight: 'none'
}
describe("Author Quiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => { }} />, div);
  });
});

describe("when no answer is selected", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => { }} />);

  });
  it('should have no background color', () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(' ');
  })
});

describe("when the wrong answer is selected", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, { highlight: 'wrong' }))} onAnswerSelected={() => { }} />);

  });
  it('should have red background color', () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
  })
}); 

describe("when the correct answer is selected", () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, { highlight: 'correct' }))} onAnswerSelected={() => { }} />);

  });
  it('should have green background color', () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
  })
}); 

describe("when the first answer is selected ", () => {
  let wrapper;
  const handleAnswerSelected = jest.fn();
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />);
    wrapper.find('.answer').first().simulate('click');
  });

  it(" onAnswerSelected should be called",() => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  })

  it(" ahould receive Helmet ",() => {
    expect(handleAnswerSelected).toHaveBeenCalledWith('Helmet');
  })

});
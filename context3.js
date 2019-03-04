import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const ThemeContext = React.createContext();

const App = () => (
  <ThemeContext.Provider value={{them: 'red'}}>
    <h1>Hello world</h1>
    <ToolBar />
  </ThemeContext.Provider>

)

const ToolBar = () => (
  <ThemedButton />
)

const ThemedButton = () => (
  <Button />
)

const Button = (props) =>{
  return (
     <ThemeContext.Consumer>
        {(context) => (<button style={{backgroundColor: context.them}}> MyButton </button>)}
      </ThemeContext.Consumer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

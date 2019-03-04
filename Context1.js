import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const ThemeContext = React.createContext();

const App = () => (
  <ThemeContext.Provider value={{
    them: 'red'
  }}>
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



class Button extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <button style={{
        backgroundColor: this.context.them
      }}> MyButton </button>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

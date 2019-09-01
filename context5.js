import React from "react";

const themes = {
  light: {
    foreground: 'green',
    background: 'green',
  },
  dark: {
    foreground: 'red',
    background: 'red',
  },
};
const ThemeContext = React.createContext();


const Button = ()=>(
  <ThemeContext.Consumer>
    {(context) => (<button onClick={context.toogleTheme} style={{backgroundColor: context.theme.background}}> MyButton </button>)}
  </ThemeContext.Consumer>
)


const ToolBar = ()=>(
  <Button/>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light
    }
  }

  _toggleTheme = () => this.setState({
    theme: this.state.theme === themes.dark ? themes.light : themes.dark
  })

  render(){
    const contextVal = {
      theme:this.state.theme,
      toogleTheme:this._toggleTheme
    }
    return(
      <ThemeContext.Provider value={contextVal}>
        <ToolBar/>
      </ThemeContext.Provider>
    )
  }
}


export default App;


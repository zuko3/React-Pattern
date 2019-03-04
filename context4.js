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


const Button = (props)=>(
  <ThemeContext.Consumer>
    {(context) => (<button onClick={props.toogleTheme} style={{backgroundColor: context.background}}> MyButton </button>)}
  </ThemeContext.Consumer>
)


const ToolBar = (props)=>(
  <Button toogleTheme = {props.toogleTheme}/>
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
    return(
      <ThemeContext.Provider value={this.state.theme}>
        <ToolBar toogleTheme={this._toggleTheme}/>
      </ThemeContext.Provider>
    )
  }
}


export default App;


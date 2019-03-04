import React, { Component } from 'react';

const ToogleContext = React.createContext();

class Toggle extends Component {
  state = { on: false };
  static On = (props) => (<ToogleContext.Consumer>
    {(context) => context.on ? props.children : null}
  </ToogleContext.Consumer>);

  static Off = (props) => (<ToogleContext.Consumer>
    {(context) => context.on ? null : props.children}
  </ToogleContext.Consumer>)

  static Button = (props) => {
    return (
      <ToogleContext.Consumer>
        {(context) => <button onClick={() => context.toggle()}>{context.on ? 'On' : 'OFF'}</button>}
      </ToogleContext.Consumer>
    )
  }

  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }
  render() {
    return <ToogleContext.Provider {...this.props} value={{
      on: this.state.on,
      toggle: this.toggle
    }} />
  }
}

const ToggleBtn = () => (
  <Toggle>
    <Toggle.On>I am On</Toggle.On>
    <Toggle.Off>I am off</Toggle.Off>
    <div>
      <Toggle.Button />
    </div>
  </Toggle>
)



const App = () => <ToggleBtn />

export default App;

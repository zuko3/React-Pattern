import React, { Component } from 'react';

const AppContext = React.createContext();

class Toggle extends React.Component {
  state = { on: false };
  static On = (props) => (
    <AppContext.Consumer>
      {({ on }) => (on ? props.children : null)}
    </AppContext.Consumer>
  );
  static Off = (props) => (
    <AppContext.Consumer>
      {({ on }) => (on ? null : props.children)}
    </AppContext.Consumer>
  );
  static Button = (props) => (
    <AppContext.Consumer>
      {({ toggle }) => <button onClick={toggle}>toggle</button>}
    </AppContext.Consumer>
  );

  toggle = () =>
    this.setState({
      on: !this.state.on,
    });

  render() {
    return (
      <AppContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

function App() {
  return (
    <Toggle>
      <Toggle.On>I am On</Toggle.On>
      <Toggle.Off>I am off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  );
}
export default App;

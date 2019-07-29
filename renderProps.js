import React, { Component } from 'react';
import { render } from 'react-dom';

class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false
    }
  }
  _toggle = () => this.setState({
    on: !this.state.on
  })

  render() {
    return this.props.children({ on: this.state.on, toggle: this._toggle })
  }
}

function App() {
  return (
    <div>
      <Toggle children={({ on, toggle }) => (
        <div>
          {on ? <p>I am on</p> : <p>I am off</p>}
          <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
        </div>
      )} />

      <Toggle>
        {({ on, toggle }) => (
          <div>
            {on ? <p>I am on</p> : <p>I am off</p>}
            <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
          </div>
        )}
      </Toggle>
    </div>
  )
}
render(<App />, document.getElementById('root'));

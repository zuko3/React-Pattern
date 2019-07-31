import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

const callAll = (...fn) => (...args) => fn.forEach(fn => {
  typeof fn === "function" && fn(...args)
});

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

  _getClickHandlerProps = ({ onClick, ...rest } = {}) => {
    return ({
      onClick: callAll(this, onClick, this._toggle),
      ...rest
    })
  }

  _getStateProps = () => {
    return ({
      on: this.state.on,
      togglerProps: this._getClickHandlerProps
    })
  }

  render() {
    return this.props.children(this._getStateProps())
  }
}

function App() {
  return (
    <div>
      <Toggle>
        {({ on, togglerProps }) => (
          <div>
            {on ? <p>I am on</p> : <p>I am off</p>}
            <button {...togglerProps({
              onClick: () => console.log("+++++ ButtonClicked"),
              tabIndex: 0
            })}>{on ? "ON" : "OFF"}</button>
          </div>
        )}
      </Toggle>
    </div>
  )
}
render(<App />, document.getElementById('root'));

import React, { Component } from 'react';
/**
 * This will come from some library
 */
const Switch = (props) => (
  <React.Fragment>
    {props.on ? <p>I am On</p> : <p>I am Off</p>}
    <button onClick={props.onClick}>{props.on ? "Switch ON" : "Switch OFF"}</button>
  </React.Fragment>
)


/**
 * give rendering control to users with prop getters
 */

const callAll = (...fn) => (...args) => fn.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = this._getInitialState()
  }

  setInternalState = (changes,cb) =>{
    this.setState(state=>{
      const changesObject  = typeof changes ==='function' ? changes(state) : changes;
      const reducedChanges = this.props.stateReducer(state,changesObject) || {}
      return reducedChanges;
    },cb)
  }

  _getInitialState = () => ({
    on: false
  })

  _toggle = () => {
    this.setInternalState({
      on: !this.state.on
    }, this.props.onToggle)
  }

  _getStateAndHelpers = () => {
    return {
      on: this.state.on,
      toggle: this._toggle,
      reset: this._reset,
      togglerProps: this._getTogglerProps
    }
  }

  _getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, this._toggle),
    ...props
  })

  _reset = () => {
    this.setInternalState(this._getInitialState(), this.props.onReset)
  }

  render() {
    return this.props.children(this._getStateAndHelpers())
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState = () => ({ timesCliked: 0 })

  handleToggle = () => {
    this.setState({
      timesCliked: this.state.timesCliked + 1
    })
  }

  handleReset = () => this.setState(this.initialState)

  stateReducer = (state, changes) => {
    if (this.state.timesCliked >= 4) {
      return { ...changes, on: false }
    }
    return changes;
  }

  render() {
    const { timesCliked } = this.state;
    return (
      <Toggle stateReducer={this.stateReducer} onReset={this.handleReset} onToggle={this.handleToggle}>
        {toggle => (
          <div>
            <Switch {...toggle.togglerProps({
              on: toggle.on
            })} />
            {timesCliked > 4 ? (
              <div>You have clicked more than 4 times</div>
            ) : timesCliked > 0 ? (<div>clicked {timesCliked}</div>) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    )
  }
}


export default App;

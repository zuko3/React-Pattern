/*
*State upliftment
*/

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

  _getInitialState = () => ({
    on: false
  })

  _toggle = () =>
    this.setState({
      on: !this.state.on
    }) 

  _getStateAndHelpers = () =>{
    return{
      on:this.state.on,
      toggle:this._toggle,
      reset: this._reset,
      togglerProps: this._getTogglerProps
    }
  }

  _getTogglerProps =({onClick,...props}={})=>({
      onClick:callAll(onClick,this._toggle),
      ...props
    })

  _reset = () =>{
    this.setState(this._getInitialState(),this.props.onReset)
  }

  render() {
    return this.props.children(this._getStateAndHelpers())
  }
}

const App = () => (
  <Toggle>
    {({ on, togglerProps,reset }) =>{
      return (
      <div>
        {on ? <p>I am on</p> : <p>I am off</p>}
        <Switch {...togglerProps({on})} />
        <button {...togglerProps({
          onClick:()=>console.log("Button clicked")
        })}>{on ? "ON" : "OFF"}</button>
         <button onClick={reset}>Reset</button>
      </div>
    )}}
  </Toggle>
)


export default App;

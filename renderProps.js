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
 * Render props example starts
 */

const children = ({ on, toggle }) => (<Switch onClick={toggle} on={on} />)

class Toggle extends React.Component {
 // static defaultProps = {children}
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



/**
 * Two ways render props
 */
const App = () => (
  // <Toggle children={({ on, toggle }) => (
  //   <div>
  //     {on ? <p>I am on</p> : <p>I am off</p>}
  //     <Switch onClick={toggle} on={on} />
  //     <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
  //   </div>
  // )} />

  <Toggle>
    {({ on, toggle }) => (
      <div>
        {on ? <p>I am on</p> : <p>I am off</p>}
        <Switch onClick={toggle} on={on} />
        <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
      </div>
    )}
  </Toggle>
)


export default App;

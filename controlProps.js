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

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.on === undefined ? false : props.on
  }

  getState = () => ({
    on: this.props.on === undefined ? this.state.on : this.props.on
  })

  handleToggle = () => {
    if (this.props.on === undefined) {
      this.setState({
        on: !this.getState().on
      })
    } else {
      this.props.onToggle()
    }
  }

  render() {
    return (
      <Switch onClick={this.handleToggle} on={this.getState().on} />
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
  }

  initialState = () => ({ bothOn: false })

  handleToggle = () => {
    this.setState({
      bothOn: !this.state.bothOn
    })
  }

  render() {
    const { bothOn } = this.state;
    return (
      <div>
        <Toggle ref={(r) => this.ref1 = r} on={bothOn} onToggle={this.handleToggle} />
        <Toggle ref={(r) => this.ref2 = r}  on={bothOn} onToggle={this.handleToggle} />
      </div>
    )
  }
}


export default App;

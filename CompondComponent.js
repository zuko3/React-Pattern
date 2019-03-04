/*import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Switch from '@material-ui/core/Switch';

class Toggle extends Component {
  state = { on: false };
  static On = (props) => props.on ? props.children : null;
  static Off = (props) => props.on ? null : props.children;
  static Button = (props) => (<Switch
    checked={props.on}
    onChange={() => props.toggle()} />)

  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }
  render() {
    return React.Children.map(this.props.children,childEl=>
      React.cloneElement(childEl,{
        on:this.state.on,
        toggle:this.toggle
      })
    )
  }
}

const ToggleBtn =()=>(
  <Toggle>
    <Toggle.On>I am On</Toggle.On>
       <Toggle.Off>I am off</Toggle.Off>
       <Toggle.Button/>
  </Toggle>
)



render(<ToggleBtn />, document.getElementById('root'));
*/

import React, { Component } from 'react';


class Toggle extends Component {
  state = { on: false };
  static On = (props) => props.on ? props.children : null;
  static Off = (props) => props.on ? null : props.children;
  static Button = (props) => {
    const buttonText = props.on ? 'ON' : 'OFF'
    return (
      <div>
        <button onClick={() => props.toggle()}>{buttonText}</button>
      </div>
    )
  }

  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }
  render() {
    return React.Children.map(this.props.children, childEl =>
      React.cloneElement(childEl, {
        on: this.state.on,
        toggle: this.toggle
      })
    )
  }
}

const ToggleBtn = () => (
  <Toggle>
    <Toggle.On>I am On</Toggle.On>
    <Toggle.Off>I am off</Toggle.Off>
    <Toggle.Button />
  </Toggle>
)



const App = () => <ToggleBtn />

export default App;

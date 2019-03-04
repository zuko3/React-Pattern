import React, { Component } from 'react';
/**
 * This will come from some library
 */
const Switch = (props) => (
  <React.Fragment>
    <button onClick={props.onClick}>{props.on ? "ON" : "OFF"}</button>
  </React.Fragment>
)

/**
 * Structure for the patterns start
 */
const ToggleContext = React.createContext();

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
  }

  static Consumer = props => (
    <ToggleContext.Consumer {...props} />
  )

  static On = (props) => (<ToggleContext.Consumer>
    {(context) => context.on ? props.children : null}
  </ToggleContext.Consumer>);

  static Off = (props) => (<ToggleContext.Consumer>
    {(context) => context.on ? null : props.children}
  </ToggleContext.Consumer>)

  static Button = (props) => {
    return (
      <ToggleContext.Consumer>
        {(context) => <button onClick={() => context.toggle()}>{context.on ? 'On' : 'OFF'}</button>}
      </ToggleContext.Consumer>
    )
  }

  _toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }

  _getChildrenToRender = (children, value) => {
    if (children.prototype && children.prototype.isReactComponent)
      return React.createElement(children, value)
    else if (typeof children === 'function') return children(value)
    else return children;
  }
  render() {
    const { children, ...otherProps } = this.props
    const value = {
      on: this.state.on,
      toggle: this._toggle
    }
    return <ToggleContext.Provider {...otherProps} value={value}>
      {this._getChildrenToRender(children, value)}
    </ToggleContext.Provider>
  }
}

const withToggle = (Component) => (props) => (
  <Toggle.Consumer>
    {(context) => <Component {...props} {...context} />}
  </Toggle.Consumer>
)

/**
 * Structure for the patterns ends
 */


/**
 * Compounded pattern pattern
 */
const ToogleBtnCompoundedPattern = () => (
  <Toggle>
    <Toggle.On>The button is on</Toggle.On>
    <Toggle.Off>The button is off</Toggle.Off>
    <Toggle.Button />
  </Toggle>
)

/**
 * Provider pattern
 */
const ToggleProviderPattern = (props) => {
  return (
    <Toggle {...props}>
      <Toggle.Consumer>
        {({ on, toggle }) => (
          <div>
            {on ? 'The button is on' : 'The button is off'}
            <Switch on={on} onClick={toggle} />
          </div>
        )}
      </Toggle.Consumer>
    </Toggle>
  )
}

/**
 * Render patterns
 */
const RenderPropsPattern = (props) => {
  return (
    <Toggle {...props}>
      {({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
        </div>
      )}
    </Toggle>
  )
}

/**
 * Component Injection
 */
class MyToggleConsumerComponent extends React.Component {
  render() {
    const { on, toggle } = this.props
    return (
      <div>
        {on ? 'The button is on' : 'The button is off'}
        <Switch on={on} onClick={toggle} />
      </div>
    )
  }
}

function ComponentInjection(props) {
  return <Toggle {...props}>{MyToggleConsumerComponent}</Toggle>
}


/**
 * Higher order component patterns
 */
const ToggleBaseComponent = ({ on, toggle }) => (
  <div>
    {on ? 'The button is on' : 'The button is off'}
    <Switch on={on} onClick={toggle} />
  </div>
)
const WrappedComponent = withToggle(ToggleBaseComponent);
const ToggleHoc = (props) => (
  <Toggle {...props}>
    <WrappedComponent />
  </Toggle>
)


const App = () => (
  <div>
    <h2>React patterns</h2>
    <div>
      <p><b>Compounded pattern</b></p>
      <ToogleBtnCompoundedPattern />
    </div>
    <div>
      <p><b>Provider pattern</b></p>
      <ToggleProviderPattern />
    </div>
    <div>
      <p><b>Render Props pattern</b></p>
      <RenderPropsPattern />
    </div>
    <div>
      <p><b>Component Injection</b></p>
      <ComponentInjection />
    </div>
    <div>
      <p><b>Hoc pattern</b></p>
      <ToggleHoc/>
    </div>
  </div>
)

export default App;

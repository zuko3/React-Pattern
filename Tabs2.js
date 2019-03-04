import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import PropTypes from 'prop-types';

const Pane = (props) => (<div>{props.children}</div>)

class Tabs extends React.Component {
  static propTypes = {
    selected: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]).isRequired
  }
  static defaultProps = {
    selected: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    }
  }

  handleClick = (index) => this.setState({
    selected: index
  })

  _renderTabs = () => {
    const { children } = this.props;
    return (
      <div>
        {children.map((child, index) => (
          <div style={{ 'border': '1px solid black' }} onClick={() => this.handleClick(index)}>{child.props.label}</div>
        ))}
      </div>
    )
  }

  _renderContent = () => {
    return (
      <div>
        {this.props.children.map((child, index) => this.state.selected === index ? child.props.children : null)}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this._renderTabs()}
        {this._renderContent()}
      </div>
    );
  }
}

const App = () => (
  <Tabs selected={0}>
    <Pane label="Tab 1">
      <div>This is my tab 1 contents!</div>
    </Pane>
    <Pane label="Tab 2">
      <div>This is my tab 2 contents!</div>
    </Pane>
    <Pane label="Tab 3">
      <div>This is my tab 3 contents!</div>
    </Pane>
  </Tabs>
)




render(<App/>, document.getElementById('root'));

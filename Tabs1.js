import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }
  static TabList = (props) => {
    const childEl = React.Children.map(props.children, (childEl, index) =>
      React.cloneElement(childEl, {
        index,
        onClick:props.onClick
      })
    );
    return (
      <div className="tab">
        {childEl}
      </div>
    )
  }

  static Tab = (props) => React.Children.map(props.children, childEl =>
      React.cloneElement(childEl, {
        onClick: () => props.onClick(props.index)
      })
    );



  static PannelList = (props) => <div className="tabcontent">{props.children[props.activeTab]}</div>

  static Pannel = (props) => props.children;

  _setActiveTab = (index) => this.setState({activeTab:index})

  render() {
    console.log(this.state)
    return React.Children.map(this.props.children, childEl =>
      React.cloneElement(childEl, {
        onClick: this._setActiveTab,
        activeTab: this.state.activeTab
      })
    );
  }
}

const App = () => (
  <Tabs>
    <Tabs.TabList>
      <Tabs.Tab><button className="tablinks">Tab 1</button></Tabs.Tab>
      <Tabs.Tab><button className="tablinks">Tab 2</button></Tabs.Tab>
      <Tabs.Tab><button className="tablinks">Tab 3</button></Tabs.Tab>
    </Tabs.TabList>
    <Tabs.PannelList>
      <Tabs.Pannel>This is tab1</Tabs.Pannel>
      <Tabs.Pannel>This is tab2</Tabs.Pannel>
      <Tabs.Pannel>This is tab3</Tabs.Pannel>
    </Tabs.PannelList>

  </Tabs>
)

render(<App />, document.getElementById('root'));

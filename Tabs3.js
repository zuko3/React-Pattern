import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import PropTypes from 'prop-types';

const TabContext = React.createContext();

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  static TabList = (props) => (
    <div className="tab">
      {React.Children.map(props.children, (childEl, index) =>
        React.cloneElement(childEl, {
          index
        })
      )}
    </div>
  )

  static Tab = (props) => {
    if (props.children.length > 1) {
      throw new Error("Tab should contain One Element")
    }
    return (
      <TabContext.Consumer>
        {(context) =>
          React.cloneElement(props.children, {
            onClick: () => context.onClick(props.index)
          })
        }
      </TabContext.Consumer>
    )
  }

  static PannelList = (props) =>
    <TabContext.Consumer>
      {(context) => (<div className="tabcontent">{props.children[context.activeTab]}</div>)}
    </TabContext.Consumer>

  static Pannel = (props) => props.children;

  _setActiveTab = (index) => this.setState({ activeTab: index })

  render() {
    return <TabContext.Provider {...this.props} value={{
      activeTab: this.state.activeTab,
      onClick: this._setActiveTab
    }} />
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

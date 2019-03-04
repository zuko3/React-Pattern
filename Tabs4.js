import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import PropTypes from 'prop-types';

class Tabs extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      activeIndex :0
    }
  }

  _setActiveTab=(index)=>()=>{
    this.setState({
      activeIndex:index
    })
  }

  _renderTab =()=>{
    return this.props.tab.map((tab,index)=><span onClick={this._setActiveTab(index)}>{tab.name}</span>)
  }

  _renderContent =()=>{
    return this.props.tab.map((tab,index)=>index===this.state.activeIndex ?
    (<div>{tab.content}</div>):null)
  }
  render(){
    return (
      <div>
        {this._renderTab()}
          {this._renderContent()}
      </div>
    )
  }
}


const tabs = [{
  name: 'Tab 1',
  content: <h3>Content for 1</h3>
}, {
  name: 'Tab 2',
  content: 'Content for 2'

}, {
  name: 'Tab 3',
  content: 'Content for 3'
}];
const App =()=><Tabs tab={tabs}/>
render(<App/>, document.getElementById('root'));

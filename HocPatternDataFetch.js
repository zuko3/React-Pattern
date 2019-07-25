//Hoc Patterns for data Loading 
import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose } from "ramda"

const url = "https://jsonplaceholder.typicode.com/posts";

//Utility Hoc
function withNull(conditionFn) {
  return function (Component) {
    return function (props) {
      return !conditionFn(props) ? <Component {...props} /> : null;
    }
  }
}

function withComponent(conditionFn, DefaultCmp) {
  return function (Component) {
    return function (props) {
      return !conditionFn(props) ? <Component {...props} /> : <DefaultCmp />;
    }
  }
}

//List of condition
function isEmpty({ posts }) {
  return !posts.length;
}

function isNull({ posts }) {
  return !posts;
}

function isLoading({ isLoading }) {
  return isLoading;
}

//List of default components
function Loading() {
  return <h3>Loading ....</h3>
}

function Empty() {
  return <h3>You have no posts.</h3>
}

//To Render Posts
function PostsList(props) {
  const { posts } = props;
  return posts.map(post => <li>{post.title}</li>)
}

//Composed components
const composedCmp = compose(
  withComponent(isLoading, Loading),
  withNull(isNull),
  withComponent(isEmpty, Empty)
)
const FinalCmp = composedCmp(PostsList)


//Intentionaly setting data as null for handiling null senrios
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    fetch(url).then(res => res.json()).then(res => {
      this.setState({
        posts: res,
        isLoading: false
      })
    });
  }
  render() {
    return (
      <div>
        <FinalCmp {...this.state} />
      </div>
    )
  }
}



render(<App />, document.getElementById('root'));

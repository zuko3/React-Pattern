const AppRendrer =(props)=>(<div {...props}/>)

class App extends  React.Component{
  render(){
    return <AppRendrer>This is test</AppRendrer>
  }
}


export default App;


Both are equal
-------------------


const AppRendrer =(props)=>(<div>{props.children}</div>)

class App extends  React.Component{
  render(){
    return <AppRendrer>This is test</AppRendrer>
  }
}


export default App;

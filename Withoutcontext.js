import React from "react";

const App = () => (
  <div>
    <h1>Hello world</h1>
    <ToolBar them={"green"} />
  </div>

)

const ToolBar = (props) => (
  <ThemedButton them={props.them} />
)

const ThemedButton = (props) => (
  <Button them={props.them} />
)

const Button = (props) => (
  <button style={{
    backgroundColor: props.them
  }}> MyButton </button>
)

export default App;


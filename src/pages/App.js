import React from "react";
import Header from "../components/header";
import Content from "../components/content";

const App = () => {
  return (
    <>
      <Header />
      <h1 className="app">Hello, React!</h1>
      <Content />
    </>
  );
};

export default App;
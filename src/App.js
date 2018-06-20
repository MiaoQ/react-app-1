import React, { Component } from 'react';
import './App.css';
import Header from './component/Header';
import Content from './component/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isNavShow: false};
    this.handleClickHeader = this.handleClickHeader.bind(this);
  }

  handleClickHeader() {
    this.setState(
      (prevState) => ({isNavShow: !prevState.isNavShow})
    )
  }

  render() {
    return (
      <div className="App">
        <Header updateState={this.handleClickHeader} />
        <Content />
      </div>
    );
  }
}

export default App;

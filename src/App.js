import React, { Component } from 'react';
import './App.css';
import Login from './component/Login';
import Header from './component/Header';
import Content from './component/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowContentPage: false,
      userInfo: ''
    };
    this.handleIsShowContentPage = this.handleIsShowContentPage.bind(this);
  }
  handleIsShowContentPage(obj) {
    this.setState(obj);
  }
  render() {
    if (this.state.isShowContentPage) {
      return (
        <div className="App">
          <Header />
          <Content userInfo={this.state.userInfo} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login isShowContentPage={this.handleIsShowContentPage} />
        </div>
      );
    }
  }
}

export default App;

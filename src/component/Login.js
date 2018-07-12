import React, { Component } from 'react';
import './Login.css';
import { fetch } from '../cfg/common';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        //this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }
    handleChangeName(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }
    /*handleSignUp() {
        var obj = {
            username: this.state.username,
            password: this.state.password
        };
        fetch.post('createAccount', obj).then((res) => {
            this.props.isShowContentPage({});
        });
    }*/
    handleSignIn() {
        var obj = {
            username: this.state.username,
            password: this.state.password
        };
        fetch.post('checkaccount', obj).then((res) => {
            res = JSON.parse(res);
            if (res.length === 1) {
                this.props.isShowContentPage({
                    isShowContentPage: true,
                    userInfo: res[0]
                });
            } else {
                console.log("err");
            }
        });
    }
    render() {
        return (
            <div className="login-box">
                <input type="text" placeholder="用户名" onChange={this.handleChangeName} value={this.state.username} />
                <input type="password" placeholder="密码" onChange={this.handleChangePassword} value={this.state.password} />
                <button onClick={this.handleSignIn}>登录</button>
            </div>
        );
    }
}

export default Login;
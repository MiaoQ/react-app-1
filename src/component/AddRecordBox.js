import React, { Component } from 'react';
import './AddRecordBox.css';
import { fetch } from '../cfg/common';

class AddRecordBox extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleAddRecord = this.handleAddRecord.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleAddRecord(){
        var time = new Date(),
            key = time.getTime();
        time = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay() + ' ' + time.getHours() + ':' + time.getMinutes();
        var obj = {user: this.props.user, key: key, time: time, txt: this.state.value};
        this.setState({value: ''});
        fetch.post('addrecord', obj).then((res) => {
            this.props.updateRecord(res);
        });
    }
    render() {
        return (
            <div className="post-container">
                <input type="text" className="post-bar" placeholder="输入一条新动态" value={this.state.value} onChange={this.handleChange} />
                <button className="post-btn" onClick={this.handleAddRecord}>发表</button>
            </div>
        );
    }
}

export default AddRecordBox;
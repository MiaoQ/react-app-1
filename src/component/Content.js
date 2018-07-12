import React, { Component } from 'react';
import './Content.css';
import { fetch } from '../cfg/common';
import AddRecordBox from './AddRecordBox';
import EmotionBoxes from './EmotionBoxes';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                $ref: 'accounts',
                $id: this.props.userInfo._id,
                $db: 'ACCOUNT'
            },
            userInfo: this.props.userInfo,
            records: [{
                key: '',
                time: '',
                txt: ''
            }]
        };
        this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    }
    componentDidMount() {
        fetch.get('getrecords').then((res) => {
            res = JSON.parse(res);
            if (res.length) {
                this.setState({records: res});
            }
        });
    }
    handleUpdateRecord(records){
        this.setState({records: JSON.parse(records)});
    }
    render() {
        return (
            <div className="content">
                <AddRecordBox user={this.state.user} updateRecord={this.handleUpdateRecord} />
                <EmotionBoxes userInfo={this.state.userInfo} records={this.state.records} updateRecord={this.handleUpdateRecord} />
            </div>
        );
    }
}

export default Content;
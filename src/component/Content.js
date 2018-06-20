import React, { Component } from 'react';
import './Content.css';
import { fetch } from '../cfg/common';
import AddRecordBox from './AddRecordBox';
import EmotionBoxes from './EmotionBoxes';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.setState({records: JSON.parse(res)});
        });
    }
    handleUpdateRecord(records){
        this.setState({records: JSON.parse(records)});
    }
    render() {
        return (
            <div className="content">
                <AddRecordBox updateRecord={this.handleUpdateRecord} />
                <EmotionBoxes records={this.state.records} updateRecord={this.handleUpdateRecord} />
            </div>
        );
    }
}

export default Content;
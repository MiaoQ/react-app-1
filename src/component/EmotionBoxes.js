import React, { Component } from 'react';
import './EmotionBoxes.css';
import { fetch } from '../cfg/common';

class EmotionBox extends Component {
    constructor(props) {
        super(props);
        this.handleDelRecord = this.handleDelRecord.bind(this);
    }
    handleDelRecord() {
        var queryObj = {key: this.props.record.key};
        fetch.post('delrecord', queryObj).then((res) => {
            this.props.updateRecord(res);
        });
    }
    render() {
        if (this.props.record.txt) {
            return (
                <div className="emotion-box-container">
                    <div className="left-part">
                        <img className="user-img" src={this.props.userInfo.img} alt="头像" />
                    </div>
                    <div className="right-part">
                        <div className="user-name">{this.props.userInfo.userName}</div>
                        <div className="emotion-content">
                            {this.props.record.txt}
                        </div>
                        <div className="attach-info">
                            <span className="attach-time">{this.props.record.time}</span>
                            <span className="attach-del" onClick={this.handleDelRecord}>删除</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<input type="hidden" disabled />);
        }
    }
}

class EmotionBoxes extends Component {
    render() {
        const records = this.props.records;
        const EmotionBoxList = records.map((record) => 
            <EmotionBox key={record.key} updateRecord={this.props.updateRecord} userInfo={this.props.userInfo} record={record} />
        );
        return (
            <React.Fragment>
                {EmotionBoxList}
            </React.Fragment>
        );
    }
}

export default EmotionBoxes;
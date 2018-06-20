import React, { Component } from 'react';
import './EmotionBoxes.css';
import { fetch } from '../cfg/common';

class EmotionBox extends Component {
    constructor(props) {
        super(props);
        this.handleDelRecord = this.handleDelRecord.bind(this);
    }
    handleDelRecord() {
        var queryObj = {key: this.props.keyVal};
        fetch.post('delrecord', queryObj).then((res) => {
            this.props.updateRecord(res);
        });
    }
    render() {
        return (
            <div className="emotion-box-container">
                <div className="left-part">
                    <img className="user-img" src={this.props.img} alt="头像" />
                </div>
                <div className="right-part">
                    <div className="user-name">{this.props.userName}</div>
                    <div className="emotion-content">
                        {this.props.txt}
                    </div>
                    <div className="attach-info">
                        <span className="attach-time">{this.props.time}</span>
                        <span className="attach-del" onClick={this.handleDelRecord}>删除</span>
                    </div>
                </div>
            </div>
        );
    }
}

class EmotionBoxes extends Component {
    render() {
        const records = this.props.records;
        const EmotionBoxList = records.map((record) => 
            <EmotionBox updateRecord={this.props.updateRecord}  keyVal={record.key} key={record.key} userName={'喵喵'} img={'/imgs/miao.jfif'} txt={record.txt} time={record.time} />
        );
        return (
            <React.Fragment>
                {EmotionBoxList}
            </React.Fragment>
        );
    }
}

export default EmotionBoxes;
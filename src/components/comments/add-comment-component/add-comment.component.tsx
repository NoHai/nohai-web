import { Avatar, Col, Row } from 'antd';
import React, { Component } from 'react';
import { CommentModel } from '../../../contracts/models/comment.model';
import './add-comment.component.scss';
import { AddCommentProps } from './add-comment.props';

class AddCommentComponent extends Component<AddCommentProps> {
  state = { comment: new CommentModel() };

  valueChange(event: any) {
    let value = event.target.innerHTML;
    this.setState((prevState: any) => ({
      comment: {
        ...prevState.comment,
        Description: value,
      },
    }));
  }

  computeComment() {
    let newComm = new CommentModel();
    newComm.Description = this.state.comment.Description;
    newComm.EventId = this.props.eventId;
    newComm.UserId = this.props.userId;
    newComm.Date = new Date();
    this.props.addComment(newComm);
    this.clearData();
  }

  clearData() {
    let commBox = document.getElementById('comment-box');
    if (commBox) {
      commBox.innerHTML = '';
    }
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col span={4} className="pt-8">
            <Avatar
              style={{
                backgroundColor: this.props.avatarColor,
                verticalAlign: 'middle',
              }}
              size="large"
            >
              {this.props.initials}
            </Avatar>
          </Col>
          <Col span={20}>
            <div className="add-comment-container">
              <div
                data-placeholder="Adaugă un comentariu..."
                contentEditable={true}
                onInput={(e) => this.valueChange(e)}
                id={'comment-box'}
                className="add-comment"
              >
                {this.props.comment.Description}
              </div>
              <div
                className="icon mdi mdi-send send-btn"
                onClick={() => this.computeComment()}
              ></div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default AddCommentComponent;

import { Row } from 'antd';
import React, { Component } from 'react';
import './comment.component.scss';
import { CommentProps } from './comment.props';

class CommentComponent extends Component<CommentProps> {
  render() {
    return (
      <Row>
        <div className="container">
          <img src={this.props.avatar} className="avatar" alt=""/>
          <div className={'comment-container'}>
            <div className="author">{this.props.author}</div>
            <div className="sender-comment">{this.props.description}</div>
          </div>
        </div>
      </Row>
    );
  }
}

export default CommentComponent;

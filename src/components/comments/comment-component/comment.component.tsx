import { Avatar, Row } from 'antd';
import React, { Component } from 'react';
import ColorHelper from '../../../helpers/color.helper';
import './comment.component.scss';
import { CommentProps } from './comment.props';

class CommentComponent extends Component<CommentProps> {
  render() {
    return (
      <Row>
        <div className="container">
          <Avatar
            style={{
              backgroundColor: ColorHelper.stringToHslColor(this.props.author),
              verticalAlign: 'middle',
            }}
            size="large"
          >
            {this.props.initials}
          </Avatar>
          <div className={'comment-container'}>
            <div className="author">{this.props.author}</div>
            <div className="comment-text">{this.props.description}</div>
          </div>
        </div>
      </Row>
    );
  }
}

export default CommentComponent;

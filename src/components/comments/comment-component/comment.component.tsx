import { Avatar, Modal, Row } from 'antd';
import React, { Component } from 'react';
import ColorHelper from '../../../helpers/color.helper';
import './comment.component.scss';
import { CommentProps } from './comment.props';

class CommentComponent extends Component<CommentProps> {
  public clickHoldTimer: any;
  timeLeft: any = 3;
  interval: any;

  state = { visible: false, selected: false };

  showModal() {
    if (this.props.currentUserId === this.props.userId)
      this.setState({
        visible: true,
        selected: true,
      });
  }

  hideModal = () => {
    this.setState({
      visible: false,
      selected: false,
    });
  };

  deleteComment() {
    this.hideModal();
    this.props.deleteComment(this.props.commentId);
  }

  render() {
    let commentStyle = this.state.selected
      ? 'comment-container selected-comment'
      : 'comment-container';
    return (
      <Row>
        <div className="container" onClick={() => this.showModal()}>
          <Avatar
            style={{
              backgroundColor: ColorHelper.stringToHslColor(this.props.author),
              verticalAlign: 'middle',
            }}
            size="large"
          >
            {this.props.initials}
          </Avatar>
          <div className={commentStyle}>
            <div className="author">{this.props.author}</div>
            <div className="comment-text">{this.props.description}</div>
          </div>
        </div>
        <Modal
          title="Ștergere comentariu"
          visible={this.state.visible}
          onOk={() => this.deleteComment()}
          onCancel={this.hideModal}
          okText="Ok"
          cancelText="Anulează"
        >
          <p>Doriți stergerea acestui comentariu?</p>
        </Modal>
      </Row>
    );
  }
}

export default CommentComponent;

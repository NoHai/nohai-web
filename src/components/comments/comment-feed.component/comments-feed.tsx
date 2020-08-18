import { Row } from 'antd';
import React, { Component } from 'react';
import { CommentModel } from '../../../contracts/models/comment.model';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import { UserRepository } from '../../../data/repositories';
import { CommentRepository } from '../../../data/repositories/comment.repository';
import ColorHelper from '../../../helpers/color.helper';
import AddCommentComponent from '../add-comment-component/add-comment.component';
import CommentComponent from '../comment-component/comment.component';
import { CommentFeedProps } from './comment-feed.props';
import './comments-feed.scss';

class EventCommentsFeed extends Component<CommentFeedProps> {
  comment = new CommentModel();
  public comments: any = [];
  public showFewComments: any = [];

  state = {
    comments: [],
    comment: new CommentModel(),
    user: new UserViewModel(),
    showMore: false,
    displayShowMore: false,
  };

  async componentDidMount() {
    this.getUserInfo();
    this.comments = this.props.comments;
    this.formatComments();
  }

  formatComments() {
    if (this.comments.length > 5) {
      this.showFewComments = this.comments.slice(this.comments.length - 3);
      this.setState({
        comments: this.showFewComments,
        displayShowMore: true,
      });
    } else {
      this.setState({
        comments: this.comments,
        displayShowMore: false,
      });
    }
  }

  showMoreComms(status: boolean) {
    if (status) {
      this.setState({
        comments: this.comments,
        showMore: true,
      });
    } else {
      this.setState({ comments: this.showFewComments, showMore: false });
    }
  }

  async getUserInfo() {
    let userDetails = await UserRepository.Get();
    this.setState({ user: userDetails });
  }

  addComment(comment: CommentModel) {
    let newComm = comment;
    if (comment.Description !== '' && comment.Description !== undefined) {
      const result = CommentRepository.Create(newComm);
      newComm.User.FirstName = this.state.user.user.FirstName;
      newComm.User.LastName = this.state.user.user.LastName;
      newComm.User.Url = this.state.user.user.Url;
      if (result) {
        this.comments.push(newComm);
        this.formatComments();
      }
      this.updateCommentsCounter(this.state.comments.length);
    }
  }

  updateCommentsCounter(nr: number) {
    this.props.updateCommentsCount(nr);
  }

  getInitials(firstname: string, lastname: string) {
    if (firstname && lastname) {
      let str = `${firstname} ${lastname}`;
      let matches = str.match(/\b(\w)/g);
      if (matches) {
        let acronym = matches.join('');
        return acronym.toUpperCase();
      }
    }
    return;
  }

  render() {
    let showComments = this.state.showMore
      ? 'Vezi mai putine comentarii'
      : 'Vezi mai multe comentarii';
    let displayShowMore = this.state.displayShowMore ? 'show-more' : 'show-more hide';

    const initials = this.getInitials(
      this.state.user.user.FirstName,
      this.state.user.user.LastName
    );

    return (
      <div className="container">
        <Row>
          {this.state.user.user.FirstName && (
            <AddCommentComponent
              author={`${this.state.user.user.FirstName} ${this.state.user.user.LastName}`}
              initials={initials}
              comment={this.state.comment}
              addComment={(e) => this.addComment(e)}
              eventId={this.props.eventId}
              userId={this.state.user.user.Id}
              avatarColor={ColorHelper.stringToHslColor(
                `${this.state.user.user.FirstName} ${this.state.user.user.LastName}`
              )}
            />
          )}
        </Row>
        {this.state.comments.map((element: any, index: any) => {
          return (
            <CommentComponent
              key={index}
              avatar={element.User.Url}
              description={element.Description}
              author={`${element.User.FirstName} ${element.User.LastName}`}
              initials={this.getInitials(element.User.FirstName, element.User.LastName)}
              date={element.Date}
              eventId={this.props.eventId}
            ></CommentComponent>
          );
        })}
        <div className={displayShowMore} onClick={() => this.showMoreComms(!this.state.showMore)}>
          {showComments}
        </div>
      </div>
    );
  }
}
export default EventCommentsFeed;

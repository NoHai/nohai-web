import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { EventService } from '../../business/services';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import EventHelper from '../../helpers/event.helper';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { default as history, default as HistoryHelper } from '../../utilities/core/history';
import TokenProvider from '../../utilities/providers/token.provider';
import { EventCardAvailability } from '../event-card-availability/event-card-availability.component';
import { EventCardButton } from '../event-card-button/event-card-button.component';
import EventCardDetails from '../event-card-details/event-card-details.component';
import EventCardOwner from '../event-card-owner/event-card-owner.component';
import EventCardTitle from '../event-card-title/event-card-title.component';
import EventDetailsFooterButtons from '../event-details-section/event-details-footer-buttons';
import EventMap from '../event-map/event-map.component';
import EventMembers from '../event-members/event-members.component';
import './event-card.component.scss';
import EventCommentsFeed from '../comments/comment-feed.component/comments-feed';

class EventCard extends Component<any, any> {
  private isEditable = false;
  private userId = '';
  constructor(props: any) {
    super(props);

    this.state = {
      eventDetails: this.props.eventDetails,
      comments: this.props.eventComments,
      requestSent: false,
      displayComments: false,
      commentsLength: 0,
    };

    this.isEditable = HistoryHelper.containsPath('/edit-event');
  }

  updateCommentsCounter(nr: number) {
    this.setState({ comments: nr });
  }

  async componentDidMount() {
    const user = await TokenProvider.getUser();
    user ? (this.userId = user.userId) : (this.userId = '');
    this.setState({ comments: this.props.eventComments });
  }

  toggleComments() {
    this.setState({ displayComments: !this.state.displayComments });
  }

  render() {
    return (
      <div className="item-card event-card">
        <EventCardTitle
          imagePath={this.props.eventDetails.sport.ImagePath}
          title={EventHelper.generateTitle(this.props.eventDetails)}
        />

        <hr />

        <div>
          <Row className="margin-bottom">
            <Col span={8}>
              <EventMembers />
            </Col>

            <Col span={16}>
              <EventCardButton
                userId={this.userId}
                event={this.props.eventDetails}
                requestSent={this.state.requestSent}
                onJoinClick={() => this.joinEvent()}
                onEditClick={() => this.editEvent()}
              />
            </Col>
          </Row>

          <hr />
        </div>

        <EventCardAvailability userId={this.userId} event={this.props.eventDetails} />
        <EventCardDetails event={this.props.eventDetails} />

        <hr className="hr-margins" />

        {this.props.eventDetails.description.Description != null && (
          <p className="description">{this.props.eventDetails.description.Description}</p>
        )}

        <div
          className={'comments-header'}
          onClick={() => this.toggleComments()}
        >{`Comentarii (${this.props.eventComments.length})`}</div>
        {this.state.displayComments && (
          <EventCommentsFeed
            eventId={this.state.eventDetails.event.Id}
            comments={this.props.eventComments}
            updateCommentsCount={(e) => this.updateCommentsCounter(e)}
          />
        )}
        <hr />

        <EventCardOwner owner={this.props.eventDetails.owner} />

        {this.props.eventDetails.locationDetails.Longitude !== '' && (
          <EventMap
            latitude={this.props.eventDetails.locationDetails.Latitude}
            longitude={this.props.eventDetails.locationDetails.Longitude}
          />
        )}
        <EventDetailsFooterButtons
          event={this.props.eventDetails}
          userId={this.userId}
          requestSent={this.state.requestSent}
          leaveEvent={() => this.leaveEvent()}
          cancelEvent={() => this.cancelEvent()}
          cancelRequest={() => this.cancelPendingRequest()}
        ></EventDetailsFooterButtons>
      </div>
    );
  }

  private async cancelEvent() {
    const id = await EventService.Delete(this.props.eventDetails.event.Id);
    if (id) {
      history.push('/');
    }
  }

  private async cancelPendingRequest() {
    await EventService.CancelPendingRequest(this.props.eventDetails.event.Id);
    history.goHome();
  }

  private async editEvent() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.props.eventDetails);
    history.push('/edit-event/participants-details');
  }

  private async leaveEvent() {
    const result = EventService.Leave(this.props.eventDetails.event.Id);
    if (result) {
      history.push('/');
    }
  }

  private async joinEvent() {
    await EventService.Join(this.props.eventDetails.event.Id);
    this.setState({
      requestSent: true,
    });
  }
}

export default EventCard;

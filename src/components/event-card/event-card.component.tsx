import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button } from 'antd';
import EventMembers from '../event-members/event-members.component';
import EventMap from '../event-map/event-map.component';
import { EventService } from '../../business/services';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import TokenProvider from '../../utilities/providers/token.provider';
import EventCardTitle from '../event-card-title/event-card-title.component';
import EventCardDetails from '../event-card-details/event-card-details.component';
import EventCardOwner from '../event-card-owner/event-card-owner.component';
import { EventCardAvailability } from '../event-card-availability/event-card-availability.component';
import { EventCardButton } from '../event-card-button/event-card-button.component';
import EventHelper from '../../helpers/event.helper';
import moment from 'moment';

class EventCard extends Component<any, any> {
  private isForPreview = false;
  private userId = '';
  constructor(props: any) {
    super(props);

    this.state = {
      eventDetails: this.props.eventDetails,
      requestSent: false,
    };

    this.isForPreview = window.location.pathname.endsWith('preview');
  }

  async componentDidMount() {
    const user = await TokenProvider.getUser();
    user ? (this.userId = user.userId) : (this.userId = '');
  }

  render() {
    return (
      <div className="item-card event-card">
        <EventCardTitle
          imagePath={this.props.eventDetails.sport.ImagePath}
          title={this.generateTitle()}
        />

        <hr />

        {!this.isForPreview && (
          <div>
            <Row className="margin-bottom">
              <Col span={10}>
                <EventMembers
                  isOwner={EventHelper.isOwner(this.props.eventDetails, this.userId)}
                  eventMembers={this.props.eventDetails.participants}
                  onKickoutParticipant={e => this.kickoutParticipant(e)}
                />
              </Col>

              <Col span={14}>
                <EventCardButton
                  userId={this.userId}
                  event={this.props.eventDetails}
                  requestSent={this.state.requestSent}
                  onJoinClick={() => this.joinEvent()}
                  onCancelClick={() => this.cancelEvent()}
                />
              </Col>
            </Row>

            <hr />
          </div>
        )}

        <EventCardAvailability userId={this.userId} event={this.props.eventDetails} />
        <EventCardDetails event={this.props.eventDetails} />

        <hr />

        <p className="description">{this.props.eventDetails.description.Description}</p>

        {!this.isForPreview && <EventCardOwner owner={this.props.eventDetails.owner} />}

        <EventMap
          latitude={this.props.eventDetails.locationDetails.Latitude}
          longitude={this.props.eventDetails.locationDetails.Longitude}
        />
        {this.leaveEvent()}
        {this.isForPreview && (
          <div className="create-event-wrapper">
            <div className="sub-title">Totul este corect?</div>
            <p>Daca totul este ok creeaza evenimentul si asteapta ca lumea sa ti se alature</p>

            <Button
              type="primary"
              size="large"
              block={true}
              className="margin-bottom"
              onClick={() => {
                this.createEvent();
              }}
            >
              Creeaza evenimentul
            </Button>

            <Button type="link" block={true} size="small" onClick={() => this.goBack()}>
              Am uitat ceva
            </Button>
          </div>
        )}
      </div>
    );
  }

  private leaveEvent() {
    if (!this.isForPreview) {
      const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.eventDetails, this.userId);
      return (
        isAlreadyAccepted && (
          <div className="create-event-wrapper">
            <div className="sub-title">A aparut ceva?</div>
            <p>Daca a aparut ceva si nu mai poti ajunge paraseste evenimentul</p>

            <Button type="primary" block={true} className="margin-bottom">
              Paraseste evenimentul
            </Button>
          </div>
        )
      );
    }
  }

  private async createEvent() {
    const id = await EventService.Create(this.props.eventDetails);
    if (id) {
      LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
      history.push('/');
    }
  }

  private async cancelEvent() {
    const id = await EventService.Delete(this.props.eventDetails.event.Id);
    if (id) {
      history.push('/');
    }
  }

  private async joinEvent() {
    await EventService.Join(this.props.eventDetails.event.Id);
    this.setState({
      requestSent: true,
    });
  }

  private async kickoutParticipant(participantId: string) {
    let data = {
      participantId,
      eventId: this.props.eventDetails.event.Id,
    };
    await EventService.KickoutParticipant(data);
  }

  private goBack() {
    history.goBack();
  }

  private generateTitle() {
    return this.props.eventDetails.sport.Name
      ? `${this.props.eventDetails.sport.Name},
    ${moment(this.props.eventDetails.description.StartDate)
      .locale('ro')
      .format('dddd')}
    ${moment(this.props.eventDetails.description.StartDate).format('DD')} ${moment(
          this.props.eventDetails.description.StartDate
        ).format('MMMM')} ora ${this.props.eventDetails.description.StartTime}`
      : '';
  }
}

export default EventCard;

import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button, Avatar, Alert } from 'antd';
import EventTags from '../event-tags/event-tags.component';
import EventMembers from '../event-members/event-members.component';
import EventMap from '../event-map/event-map.component';
import { EventService } from '../../business/services';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import AvatarHelper from '../../helpers/avatar.helper';
import TokenProvider from '../../utilities/providers/token.provider';
import { EventSportImage } from '../event-icon/event-sport-image.component';

class EventCard extends Component<any, any> {
  private isForPreview = false;
  private userId = '';
  constructor(props: any) {
    super(props);

    this.state = {
      eventDetails: this.props.eventDetails,
      requestSent: false,
    };
    this.isForPreview = window.location.pathname === '/preview';
  }

  async componentDidMount() {
    const user = await TokenProvider.getUser();
    user ? (this.userId = user.userId) : (this.userId = '');
  }

  render() {
    return (
      <div className="item-card event-card">
        <Row>
          <Col span={5} className="text-center">
            <EventSportImage url={this.props.eventDetails.sport.ImagePath} />
          </Col>
          <Col span={19}>
            <div className="item-card-title">{this.props.eventDetails.event.Name}</div>

            <div className="item-card-options">
              <div className="item-card-option">
                <span className="icon mdi mdi-alarm" />
                {this.props.eventDetails.description.Date},{' '}
                {this.props.eventDetails.description.Time}
              </div>
              <div className="item-card-option">
                <span className="icon mdi mdi-map-marker" />
                {this.props.eventDetails.locationDetails.StreetName}
                {', '}
                {this.props.eventDetails.locationDetails.City}
              </div>
            </div>
          </Col>
        </Row>

        <EventTags
          Sport={this.props.eventDetails.sport.Name}
          Level={this.props.eventDetails.participantsDetails.Level}
          Price={this.props.eventDetails.participantsDetails.PriceForParticipant}
        />

        {!this.isForPreview && (
          <Row type="flex" align="middle">
            <Col span={12}>
              <EventMembers eventMembers={this.props.eventDetails.participants} />
            </Col>
            <Col span={12} className="text-right">
              {this.props.eventDetails.owner.Id &&
                this.props.eventDetails.owner.Id !== this.userId &&
                !this.chekIfRequestSent() &&
                !this.state.requestSent && (
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="join-button"
                    onClick={() => {
                      this.joinEvent();
                    }}
                  >
                    <span className="icon mdi mdi-hand" />
                    Vreau si eu
                  </Button>
                )}

              {this.props.eventDetails.owner.Id !== this.userId &&
                (this.chekIfRequestSent() || this.state.requestSent) &&
                !this.chekIfRequestApproved() && (
                  <Button type="dashed" block disabled className="join-button">
                    Cerere trimisa
                  </Button>
                )}

              {this.props.eventDetails.owner.Id !== this.userId &&
                this.chekIfRequestSent() &&
                this.chekIfRequestApproved() && (
                  <Alert message="Cerere aprobata" type="success" className="approvedMessage" />
                )}
            </Col>
          </Row>
        )}

        <hr />

        <p>{this.props.eventDetails.description.Description}</p>

        {!this.isForPreview && (
          <div className="text-right margin-bottom">
            <Avatar size={24} src={AvatarHelper.get(this.props.eventDetails.owner.Url)} />
            {this.props.eventDetails.owner.FirstName} {this.props.eventDetails.owner.LastName}
          </div>
        )}

        <div className="sub-title">Unde ne intalnim?</div>

        <EventMap
          latitude={this.props.eventDetails.locationDetails.Latitude}
          longitude={this.props.eventDetails.locationDetails.Longitude}
        />

        {this.isForPreview && (
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.createEvent();
              }}
            >
              Creaza evenimentul
            </Button>
          </div>
        )}
      </div>
    );
  }

  private chekIfRequestSent() {
    return this.props.eventDetails.participants
      ? this.props.eventDetails.participants.some((item: any) => item.Id === this.userId)
      : false;
  }

  private chekIfRequestApproved() {
    return this.chekIfRequestSent()
      ? this.props.eventDetails.participants.some((item: any) => item.Status === 1)
      : false;
  }
  private async createEvent() {
    const id = await EventService.Create(this.props.eventDetails);
    if (id) {
      LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
      history.push('/');
    }
  }

  private async joinEvent() {
    const id = await EventService.Join(this.props.eventDetails.event.Id);
    this.setState({
      requestSent: true,
    });
  }
}

export default EventCard;

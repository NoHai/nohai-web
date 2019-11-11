import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button, Modal } from 'antd';
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
import CreateEventFooter from '../create-event-footer/create-event-footer.component';
import HistoryHelper from '../../utilities/core/history';

const { confirm } = Modal;

class EventCard extends Component<any, any> {
  private isForPreview = false;
  private isEditable = false;
  private userId = '';
  constructor(props: any) {
    super(props);

    this.state = {
      eventDetails: this.props.eventDetails,
      requestSent: false,
    };

    this.isForPreview = window.location.pathname.endsWith('preview');
    this.isEditable = HistoryHelper.containsPath('/edit-event');
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
        )}

        <EventCardAvailability userId={this.userId} event={this.props.eventDetails} />
        <EventCardDetails event={this.props.eventDetails} />

        <hr />

        <p className="description">{this.props.eventDetails.description.Description}</p>

        {!this.isForPreview && <EventCardOwner owner={this.props.eventDetails.owner} />}

        {this.props.eventDetails.locationDetails.Longitude !== '' && (
          <EventMap
            latitude={this.props.eventDetails.locationDetails.Latitude}
            longitude={this.props.eventDetails.locationDetails.Longitude}
          />
        )}
        {this.leaveEventSection()}
        {this.cancelPendingRequestSection()}
        {this.cancelEventSection()}
        {this.isForPreview && (
          <CreateEventFooter
            showLeftButton={true}
            ShowCenterButton={true}
            showRightButton={true}
            CenterButtonIcon={'mdi-calendar-edit'}
            LeftButtonIcon={'mdi-calendar-remove'}
            LeftButtonText={'Renunta'}
            RightButtonIcon={'mdi-calendar-plus'}
            RightButtonText={`${this.isEditable ? 'Salveaza' : 'Adauga'}`}
            onRightButtonClick={() => this.createEvent()}
            onCenterButtonClick={() => this.goBack()}
            onLeftButtonClick={() => this.dropEventDraftModal(this)}
            isValid={true}
          ></CreateEventFooter>
        )}
      </div>
    );
  }

  private cancelPendingRequestSection() {
    if (!this.isForPreview) {
      const isAlreadyAccepted =
        EventHelper.isUserPending(this.props.eventDetails, this.userId) || this.state.requestSent;
      return (
        isAlreadyAccepted && (
          <div className="create-event-wrapper">
            <div className="sub-title">Te-ai razgandit?</div>
            <p>Nu mai poti ajunge? Anuleaza cererea.</p>

            <Button
              type="default"
              block={true}
              className="margin-bottom"
              onClick={() => {
                this.cancelRequestModal(this);
              }}
            >
              Anuleaza cererea
            </Button>
          </div>
        )
      );
    }
  }

  private leaveEventSection() {
    if (!this.isForPreview) {
      const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.eventDetails, this.userId);
      return (
        isAlreadyAccepted && (
          <div className="create-event-wrapper">
            <div className="sub-title">Te-ai razgandit?</div>
            <p>Nu mai poti ajunge? Paraseste evenimentul.</p>

            <Button
              type="default"
              block={true}
              className="margin-bottom"
              onClick={() => {
                this.leaveEventModal(this);
              }}
            >
              Paraseste evenimentul
            </Button>
          </div>
        )
      );
    }
  }

  private cancelEventSection() {
    if (!this.isForPreview) {
      const isOwner = EventHelper.isOwner(this.props.eventDetails, this.userId);
      return (
        isOwner && (
          <div className="create-event-wrapper">
            <div className="sub-title">Te-ai razgandit?</div>
            <p>Nu mai poti ajunge? Paraseste evenimentul.</p>

            <Button
              type="default"
              block={true}
              className="margin-bottom"
              onClick={() => {
                this.cancelEventModal(this);
              }}
            >
              Anuleaza evenimentul
            </Button>
          </div>
        )
      );
    }
  }

  private async leaveEventModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa parasesti evenimentul?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.leaveEvent();
      },
      onCancel() {},
    });
  }

  private async dropEventDraftModal(context: any) {
    const title = this.isEditable
      ? 'Esti sigur ca vrei sa renunti la editarea evenimentului?'
      : 'Esti sigur ca vrei sa renunti la crearea evenimentului?';
    confirm({
      title: title,
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.dropDraft();
      },
      onCancel() {},
    });
  }

  private dropDraft() {
    this.isEditable
      ? history.push(`/details/${this.props.eventDetails.event.Id}`)
      : history.goHome();
  }

  private async cancelRequestModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa anulezi cererea?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.cancelPendingRequest();
      },
      onCancel() {},
    });
  }

  private async cancelEventModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa anulezi evenimentul?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.cancelEvent();
      },
      onCancel() {},
    });
  }

  private async leaveEvent() {
    const result = EventService.Leave(this.props.eventDetails.event.Id);
    if (result) {
      history.push('/');
    }
  }

  private async createEvent() {
    const result = await EventService.Create(this.props.eventDetails);
    if (result) {
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

  private async editEvent() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.props.eventDetails);
    history.push('/edit-event/participants-details');
  }

  private async cancelPendingRequest() {
    await EventService.CancelPendingRequest(this.props.eventDetails.event.Id);
    history.goHome();
  }

  private goBack() {
    history.push('/create-event/description');
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

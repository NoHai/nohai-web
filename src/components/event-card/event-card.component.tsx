import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Modal } from 'antd';
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
import CreateEventFooter from '../create-event-footer/create-event-footer.component';
import HistoryHelper from '../../utilities/core/history';
import EventDetailsFooterButtons from '../event-details-section/event-details-footer-buttons';

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
          title={EventHelper.generateTitle(this.props.eventDetails)}
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
        {!this.isForPreview && (
          <EventDetailsFooterButtons
            event={this.props.eventDetails}
            userId={this.userId}
            requestSent={this.state.requestSent}
            leaveEvent={() => this.leaveEvent()}
            cancelEvent={() => this.cancelEvent()}
            cancelRequest={() => this.cancelPendingRequest()}
          ></EventDetailsFooterButtons>
        )}
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
}

export default EventCard;

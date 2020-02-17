import React, { Component } from 'react';
import { Input, Modal } from 'antd';
import { registerSchema } from 'class-validator';
import { EventDetailsViewModel } from '../../../../contracts/models';
import SportsSelection from '../../../../components/sports-selection/sports-selection.component';
import { ParticipantsDetailsSchema } from '../../../../contracts/schemas/participants-details.schema';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import CreateEventFooter from '../../../../components/create-event-footer/create-event-footer.component';
import HistoryHelper from '../../../../utilities/core/history';
const { confirm } = Modal;

registerSchema(ParticipantsDetailsSchema);

class ParticipantsDetailsEventPage extends Component<any, any> {
  private isEditable: boolean = false;
  state = {
    eventDetails: new EventDetailsViewModel(),
  };

  componentDidMount() {
    this.isEditable = HistoryHelper.containsPath('/edit-event');
    const eventDetails = LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      this.state.eventDetails
    );
    if (this.isEditable) {
      eventDetails.participantsDetails.IsValid = true;
    }
    this.setState({
      eventDetails: eventDetails,
    });
  }

  async handleChange(event: any) {
    const { name, value } = event.target;

    this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        participantsDetails: {
          ...prevState.eventDetails.participantsDetails,
          [name]: parseInt(value, 10),
        },
      },
    }));
  }

  async onCloseDrawer(activities: Array<string>) {
    this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        participantsDetails: {
          ActivityId:activities[0],
        },
      },
    }));

    if (activities.length > 0) {
      this.setState((prevState: any) => ({
        eventDetails: {
          ...prevState.eventDetails,
          participantsDetails: {
            ...prevState.eventDetails.participantsDetails,
            IsValid: true,
          },
        },
      }));
    }
  }

  public render() {
    return (
      <div className="event-list-item full-height">
        <div className="item-card full-min-height">
          <div className="margin-bottom">
            <CreateEventHeaderComponent
              title={'Detalii participanti'}
              imagePath="/assets/handshake-colour.svg"
            />
            <label>Activitatea si nivelul</label>
            <SportsSelection
              acivities={this.state.eventDetails.participantsDetails.ActivityId}
              onCloseDrawer={acivities => this.onCloseDrawer(acivities)}
            />
            <label className="inline-input-label">Locuri disponibile</label>
            <span className="optional-span">(Optional)</span>
            <Input
              className="padding-bottom"
              size="large"
              type="number"
              placeholder="Locuri Disponibile"
              data-lpignore="true"
              name="FreeSpots"
              value={this.state.eventDetails.participantsDetails.FreeSpots || ''}
              onChange={e => this.handleChange(e)}
            />
            <label className="inline-input-label">Pret participant</label>
            <span className="optional-span">(Optional)</span>
            <Input
              className="padding-bottom"
              size="large"
              type="number"
              placeholder="Pret Participant"
              data-lpignore="true"
              name="PriceForParticipant"
              value={this.state.eventDetails.participantsDetails.PriceForParticipant || ''}
              onChange={e => this.handleChange(e)}
            />
          </div>
        </div>
        <CreateEventFooter
          showLeftButton={true}
          ShowCenterButton={false}
          showRightButton={true}
          LeftButtonIcon={'mdi-calendar-remove'}
          LeftButtonText={'Renunta'}
          onRightButtonClick={() => this.goToLocationDetails()}
          onLeftButtonClick={() => this.dropEventDraft(this)}
          isValid={this.state.eventDetails.participantsDetails.IsValid}
        ></CreateEventFooter>
      </div>
    );
  }

  private async dropEventDraft(context: any) {
    const title = HistoryHelper.containsPath('/edit-event')
      ? 'Esti sigur ca vrei sa renunti la editare?'
      : 'Esti sigur ca vrei sa renunti la crearea evenimentului?';
    confirm({
      title: title,
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.onOkClick();
      },
      onCancel() {},
    });
  }

  onOkClick() {
    LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
    this.isEditable
      ? history.push(`/details/${this.state.eventDetails.event.Id}`)
      : history.goHome();
  }

  goToLocationDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable
      ? history.push('/edit-event/location-details')
      : history.push('/create-event/location-details');
  }
}

export default ParticipantsDetailsEventPage;

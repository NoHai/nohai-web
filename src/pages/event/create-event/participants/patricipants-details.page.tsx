import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import { registerSchema } from 'class-validator';
import { EventDetailsViewModel } from '../../../../contracts/models';
import SportsSelection from '../../../../components/sports-selection/sports-selection.component';
import { ParticipantsDetailsSchema } from '../../../../contracts/schemas/participants-details.schema';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { SportModel } from '../../../../contracts/models/sport.model';

registerSchema(ParticipantsDetailsSchema);

class ParticipantsDetailsEventPage extends Component<any, any> {
  state = {
    eventDetails: new EventDetailsViewModel(),
  };

  componentDidMount() {
    this.setState({
      eventDetails: LocalStorageHelper.GetItemFromLocalStorage(
        LocalStorage.CreateEvent,
        this.state.eventDetails
      ),
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

  async onCloseDrawer(sport: SportModel, level: number) {
    this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        participantsDetails: {
          ...prevState.eventDetails.participantsDetails,
          Level: level,
        },
        sport,
      },
    }));

    if (sport && sport.Name !== '') {
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
      <div className="create-event-page event-list-item full-height">
        <div className="page-sections">
          <div className="page-section page-section-large">
            <CreateEventHeaderComponent
              title={'Detalii participanti'}
              iconClass={'icon mdi mdi-account-group'}
            />
            <label>Sportul si nivelul</label>
            <SportsSelection
              sport={this.state.eventDetails.sport || ''}
              level={this.state.eventDetails.participantsDetails.Level || 0}
              onCloseDrawer={(sport, level) => this.onCloseDrawer(sport, level)}
            />
            <label>Locuri disponibile</label>
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
            <label>Pret participant</label>
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
          <Button
            disabled={!this.state.eventDetails.participantsDetails.IsValid}
            className="arrow-button align-right"
            type="link"
            onClick={() => {
              this.goToLocationDetails();
            }}
          >
            Inainte
            <Icon type="right" />
          </Button>
        </div>
      </div>
    );
  }

  goToLocationDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    history.push('/create-event/location-details');
  }
}

export default ParticipantsDetailsEventPage;

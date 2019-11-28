import React, { Component } from 'react';
import './sports-selection.component.scss';
import { SportSelectionProps } from './sports-selection.component.props';
import { CommonService } from '../../business/services/common.service';
import { SportModel } from '../../contracts/models/sport.model';
import { IonSelect, IonSelectOption } from '@ionic/react';

class SportsSelection extends Component<SportSelectionProps> {
  state = { visible: false, childrenDrawer: false, sports: new Array<SportModel>() };
  private isMount: boolean = false;
  public selectedSport = new SportModel();

  async componentDidMount() {
    this.isMount = true;
    await this.getSports();
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  public render() {
    const customActionSheetOptions = {
      header: 'Activitati',
    };
    const multiple= this.props.multiple? this.props.multiple: false

    return (
      <div>
        <IonSelect
          className="activity-selection"
          value={this.props.acivities}
          interface="action-sheet"
          placeholder="Alege Activitatea"
          multiple={multiple}
          onIonChange={e => this.onValueChange(e)}
        >
          {this.state.sports.map((element, index) => {
            return (
              <IonSelectOption key={index} value={element.Id}>
                {element.Name}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </div>
    );
  }
  private async getSports() {
    const sports = await CommonService.GetSports();

    if (this.isMount) {
      this.setState({
        sports: sports.Data,
      });
    }
  }

  private onValueChange(event: any) {
    let activities = new Array<string>();
    if (event.detail.value && event.detail.value !== this.props.acivities) {
      if(this.props.multiple){
      event.detail.value.forEach((element: any) => {
        activities.push(element);
      });
    }else{
      activities.push(event.detail.value)
    }

      this.props.onCloseDrawer(activities);
    }
  }
}

export default SportsSelection;

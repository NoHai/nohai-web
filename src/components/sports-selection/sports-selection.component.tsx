import React, { Component } from 'react';
import './sports-selection.component.scss';
import { SportSelectionProps } from './sports-selection.component.props';
import { CommonService } from '../../business/services/common.service';
import { SportModel } from '../../contracts/models/sport.model';
import { IonSelect, IonSelectOption } from '@ionic/react';

class SportsSelection extends Component<SportSelectionProps> {
  state = { visible: false, childrenDrawer: false, sports: new Array<SportModel>() };
  private levels = [1, 2, 3];
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

    return (
      <div>
        <IonSelect className="activity-selection"
          interfaceOptions={customActionSheetOptions}
          interface="action-sheet"
          placeholder="Alege Activitatea"
          multiple={true}
          onIonChange={(e)=>this.onValueChange(e)}
          //onSubmit={(e)=>this.onValueChange(e)}
        >
          {this.state.sports.map((element, index)=>{
          return <IonSelectOption key={index} value={element.Id}>{element.Name}</IonSelectOption>
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
    let sport = new SportModel();
    // sport.Id = activity.value;
    // sport.Name = activity.text;
    // if (this.props.onCloseDrawer) {
    //   this.props.onCloseDrawer(sport);
    // }
  }
}

export default SportsSelection;

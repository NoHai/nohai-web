import React, { Component } from 'react';
import './custom-datetimepicker.component.scss';
import { IonDatetime } from '@ionic/react';
import { CustomDateTimePickerProps } from './custom-datetimepicker.component.props';
import moment from 'moment'

class CustomDateTimePicker extends Component<CustomDateTimePickerProps> {
  render() {
    const dateFormat = this.props.dateFormat ? this.props.dateFormat : 'DD-MMM-YYYY';
    const placeholder = this.props.placeholder ? this.props.placeholder : 'Alege data';
    const customDayShortNames = [
      'Ian',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Iun',
      'Iul',
      'Aug',
      'Sep',
      'Oct',
      'Noi',
      'Dec',
    ];

    const min=`${moment().add(-60,'year').format('YYYY-MM-DD')}` ;
    const max=`${moment().add(1,'year').format('YYYY-MM-DD')}` ;

    return (
      <div className={this.props.cssClass}>
        <div className="calendar">
          <IonDatetime
            placeholder={placeholder}
            value={this.props.value}
            onIonChange={event => this.props.onValueChange(event.detail.value)}
            displayFormat={dateFormat}
            monthShortNames={customDayShortNames}
            min={min}
            max={max}
            doneText="Ok"
            cancelText="Anuleaza"
            translate
          ></IonDatetime>
        </div>
        {this.props.isTimePicker ? (
         <span className="icon mdi mdi-clock-outline"></span>
        ) : (
       
          <span className="icon mdi mdi-calendar-month-outline"></span>
        )}
      </div>
    );
  }
}

export default CustomDateTimePicker;

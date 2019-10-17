import React, { Component } from 'react';
import { DisplayTimeProps } from './display-time.component.props';
import DateHelper from '../../helpers/date.helper';
import moment from 'moment';

class DisplayTime extends Component<DisplayTimeProps> {
  render(): any {
    return this.displayTime();
  }
  private displayTime() {
    if (this.props.startDate === this.props.endDate) {
      return (
        <div className="item-card-option">
          <span className="icon mdi mdi-calendar-blank" />
          {DateHelper.GetDateFormat(this.props.startDate, 'DD/MM/YYYY')},{' '}
          <span className="icon-test mdi mdi-alarm" />
          <span className="margin-left">
            {this.props.startTime} -{'  '}
            {this.props.endTime}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <div className="item-card-option">
            <span className="icon mdi mdi-calendar-blank" />
            {DateHelper.GetDateFormat(this.props.startDate, 'DD/MM/YYYY')} -
            {DateHelper.GetDateFormat(this.props.endDate, 'DD/MM/YYYY')}
          </div>

          <div className="item-card-option">
            <span className="icon mdi mdi-alarm" />
            {this.props.startTime} -{' '}
            {this.props.endTime} (
            {DateHelper.GetDuration(
              moment(
                `${this.props.startDate} ${this.props.startTime}`,
                'YYYY-MM-DD HH:mm'
              ).format(),
              moment(`${this.props.endDate} ${this.props.endTime}`, 'YYYY-MM-DD HH:mm').format()
            )}
            )
          </div>
        </div>
      );
    }
  }
}

export default DisplayTime;

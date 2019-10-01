import React, { Component } from 'react';
import './create-event-header.scss';
import { CreateEventHeaderProps } from './create-event-header.props';
class CreateEventHederComponent extends Component<CreateEventHeaderProps> {
  public render() {
    return (
      <div className="header-title">
        {this.props.title}
        <div className={this.props.iconClass} />
      </div>
    );
  }
}
export default CreateEventHederComponent;

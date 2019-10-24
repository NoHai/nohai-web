import React, { Component } from 'react';
import './create-event-header.scss';
import { CreateEventHeaderProps } from './create-event-header.props';
class CreateEventHederComponent extends Component<CreateEventHeaderProps> {
  public render() {
    return (
      <div className="create-event-header">
        {!!this.props.iconClass && <div className={this.props.iconClass} />}

        {!!this.props.imagePath && (
          <div className="image" style={{ backgroundImage: `url(${this.props.imagePath})` }} />
        )}

        <div className="header-title">{this.props.title}</div>
      </div>
    );
  }
}
export default CreateEventHederComponent;

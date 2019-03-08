import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar } from 'antd';

class EventMembers extends Component {
    private _size: number = 34;

    render() {
        return (
            <div className="event-members">
                <Avatar size={this._size} src="https://randomuser.me/api/portraits/women/65.jpg" />
                <Avatar size={this._size} src="https://randomuser.me/api/portraits/women/44.jpg" />
                <Avatar size={this._size} src="https://randomuser.me/api/portraits/men/85.jpg" />
                <Avatar size={this._size}>+2</Avatar>

                {/* <div className="event-members-text">5 utilizatori inscrisi</div> */}
            </div>
        );
    }
}

export default EventMembers;

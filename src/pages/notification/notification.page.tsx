import React, { Component } from 'react';
import NotificationCard from '../../components/notification-card/notification-card';
import './notification.page.scss';
import { UserModel, EventModel } from '../../contracts/models';
import { ActionType } from '../../contracts/enums/common';

class NotificationPage extends Component {

    public render() {
        let user = new UserModel();
        user.FirstName = 'Sorin';
        user.LastName = 'Costel';
        user.Url = 'url(https://randomuser.me/api/portraits/women/65.jpg)';

        let event = new EventModel();
        event.Description =
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deleniti enim eaque';

        const notification = {
            Id: 1,
            User: user,
            Event: event,
            Action: ActionType.Request,
        };
        const notification1 = {
            Id: 2,
            User: user,
            Event: event,
            Action: ActionType.Reject,
        };
        var notifications = [notification, notification1 ];

        return (
            <div>
                {notifications.map(index => (
                    <div  key={index.Id}
                        className="event-list-item"
                        style={{ backgroundImage: this.GenerateGradient() }}
                    >
                        <NotificationCard
                            id={index.Id}
                            user={index.User}
                            event={index.Event}
                            actionType={index.Action}
                        />
                    </div>
                ))}
            </div>
        );
    }

    private GenerateGradient(): string {
        const intR = Math.floor(Math.random() * 255) + 1;
        const intG = Math.floor(Math.random() * 255) + 1;
        const intB = Math.floor(Math.random() * 255) + 1;
        return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
    }
}

export default NotificationPage;

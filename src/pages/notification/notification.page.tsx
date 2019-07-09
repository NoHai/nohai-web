import React, { Component } from 'react';
import NotificationCard from '../../components/notification-card/notification-card';
import './notification.page.scss';
import { UserModel, EventModel } from '../../contracts/models';
import { ActionType, ActionButtonType } from '../../contracts/enums/common';
import history from '../../utilities/core/history';

class NotificationPage extends Component {
    public render() {
        let user = new UserModel();
        user.FirstName = 'Danut';
        user.LastName = 'Ilie';
        user.Url = 'url(https://randomuser.me/api/portraits/women/65.jpg)';

        let event = new EventModel();
        event.Name='alergat'
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
        var notifications = [notification, notification1];

        return (
            <div>
                {notifications.map(notification => (
                    <div
                        key={notification.Id}
                        className="event-list-item"
                        style={{ backgroundImage: this.GenerateGradient() }}
                    >
                        <NotificationCard
                            id={notification.Id}
                            user={notification.User}
                            event={notification.Event}
                            actionType={notification.Action}
                            onButtonClick={this.onButtonClickHandler}
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

    private onButtonClickHandler(action: ActionButtonType, id: any, ...args: any[]) {
        switch (action) {
            default:
                break;
            case ActionButtonType.Info:
                history.push('/details');
                break;
            case ActionButtonType.Approve:
                history.push('/login');
                break;
            case ActionButtonType.Reject:
                break;
        }
    }
}

export default NotificationPage;

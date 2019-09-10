import React, { Component } from 'react';
import NotificationCard from '../../components/notification-card/notification-card';
import './notification.page.scss';
import { ListModel } from '../../contracts/models';
import { ActionButtonType } from '../../contracts/enums/common';
import history from '../../utilities/core/history';
import { NotificationService } from '../../business/services/notification.service';
import { NotificationModel } from '../../contracts/models/notification.model';

class NotificationPage extends Component {
    state = {
        notifications: new ListModel<NotificationModel>(),
    };
    async componentDidMount() {
        this.setState({
            notifications: await NotificationService.Find('782f0204-42e3-4fe1-8c96-9ee0e189a850'),
        });
    }
    public render() {
        return (
            <div className="notification-page">
                {this.state.notifications.Data.length <= 0 && (
                    <div className="position">
                        <span className="font-style">Nu ai nici o notificare</span>
                    </div>
                )}
                {this.state.notifications.Data.map(notification => (
                    <div
                        key={notification.Id}
                        className="event-list-item"
                        style={{ backgroundImage: this.GenerateGradient() }}
                    >
                        <NotificationCard
                            id={notification.EventId}
                            title={notification.Title}
                            body={notification.Body}
                            eventId={notification.EventId}
                            avatarUrl={notification.AvatarUrl}
                            actionType={notification.NotificationType}
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

    private onButtonClickHandler(action: ActionButtonType, eventId: any, ...args: any[]) {
        switch (action) {
            default:
                break;
            case ActionButtonType.Info:
                history.push('/details/'+eventId);
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

import React, { Component } from 'react';
import NotificationCard from '../../components/notification-card/notification-card';
import './notification.page.scss';
import { ActionButtonType } from '../../contracts/enums/common';
import history from '../../utilities/core/history';
import { NotificationService } from '../../business/services/notification.service';
import { NotificationModel } from '../../contracts/models/notification.model';
import { EventService } from '../../business/services';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import StoreUtility from '../../utilities/core/store.utility';
import {
  unReadNotification,
  newNotificationReceived,
} from '../../redux/actions/notification.action';
import AppLoading from '../../components/app-loading/app-loading.component';
import NoResults from '../../components/no-results/no-results.component';
import { Row, Col } from 'antd';

class NotificationPage extends Component {
  public notificationRequest = new PaginationBaseRequestModel();
  public norificationContainer = new Array<NotificationModel>();
  state = {
    notifications: new Array<NotificationModel>(),
    hasMoreItems: true,
    pageIndex: 0,
  };

  constructor(props: any) {
    super(props);
    this.getNotification = this.getNotification.bind(this);
  }
  async componentDidMount() {
    await this.getNotification();
  }
  public render() {
    return (
      <div className="notification-page full-height">
        <div className="page-sections">
          <div>
            <div className="page-section-header">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={12}>
                  <h2>Notificari</h2>
                </Col>
                <Col span={12} className="text-right">
                  <div
                    onClick={e => this.markAllAsRead()}
                    className="icon mdi mdi-email-mark-as-unread"
                  ></div>
                </Col>
              </Row>
            </div>
            {this.state.notifications && this.state.notifications.length <= 0 && (
              <NoResults text="Nu ai nici o notificare" />
            )}
          </div>

          <div className="page-section page-section-large">
            <div id="scrollableDiv" className="full-height" style={{ overflow: 'auto' }}>
              <InfiniteScroll
                dataLength={13}
                next={this.getNotification}
                hasMore={this.state.hasMoreItems}
                loader={<AppLoading />}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.9}
              >
                {this.state.notifications &&
                  this.state.notifications.map(notification => (
                    <div
                      key={notification.Id}
                      className="event-list-item"
                      style={{ backgroundImage: this.GenerateGradient() }}
                    >
                      <NotificationCard
                        id={notification.Id}
                        title={notification.Title}
                        body={notification.Body}
                        eventId={notification.EventId}
                        avatarUrl={notification.AvatarUrl}
                        actionType={notification.NotificationType}
                        status={notification.Status}
                        onButtonClick={(action, eventId, args) =>
                          this.onButtonClickHandler(action, eventId, args)
                        }
                      />
                    </div>
                  ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private GenerateGradient(): string {
    const intR = Math.floor(Math.random() * 255) + 1;
    const intG = Math.floor(Math.random() * 255) + 1;
    const intB = Math.floor(Math.random() * 255) + 1;
    return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
  }

  private async getNotification() {
    this.notificationRequest.pageIndex = this.state.pageIndex;
    let result = await NotificationService.Find(this.notificationRequest);
    result.Data.forEach(element => {
      this.norificationContainer.push(element);
    });

    if (this.norificationContainer.length >= result.Total) {
      this.setState({
        hasMoreItems: false,
      });
    }

    await this.SetNotification();
  }

  private async SetNotification() {
    await this.setState({
      notifications: this.norificationContainer,
      pageIndex: this.notificationRequest.pageIndex + 1,
    });
  }

  private async responseRequest(approve: boolean, eventId: any) {
    this.norificationContainer = new Array<NotificationModel>();
    StoreUtility.store.dispatch(unReadNotification(0));
    await this.setState({
      notifications: new Array<NotificationModel>(),
      hasMoreItems: true,
      pageIndex: 0,
    });
    approve ? await EventService.Approve(eventId) : await EventService.Reject(eventId);
    await this.getNotification();
  }

  private async RedirectToEventDetails(notificationId: string, eventId: any) {
    await NotificationService.MarkAsRead(notificationId);
    StoreUtility.store.dispatch(newNotificationReceived(-1));
    history.push('/details/' + eventId);
  }

  private async markAllAsRead() {
    this.norificationContainer = new Array<NotificationModel>();
    StoreUtility.store.dispatch(unReadNotification(0));
    await this.setState({
      notifications: new Array<NotificationModel>(),
      hasMoreItems: true,
      pageIndex: 0,
    });
    await NotificationService.MarkAllAsRead();
    await this.getNotification();
  }

  private onButtonClickHandler(
    action: ActionButtonType,
    notificationId: any,
    eventId: any,
    ...args: any[]
  ) {
    switch (action) {
      default:
        break;
      case ActionButtonType.Info:
        this.RedirectToEventDetails(notificationId, eventId);
        break;
      case ActionButtonType.Approve:
        this.responseRequest(true, notificationId);
        break;
      case ActionButtonType.Reject:
        this.responseRequest(false, notificationId);
        break;
    }
  }
}

export default NotificationPage;

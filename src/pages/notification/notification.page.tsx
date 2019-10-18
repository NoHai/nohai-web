import React, { Component } from 'react';
import NotificationCard from '../../components/notification-card/notification-card';
import './notification.page.scss';
import { ActionButtonType } from '../../contracts/enums/common';
import history from '../../utilities/core/history';
import { NotificationService } from '../../business/services/notification.service';
import { NotificationModel } from '../../contracts/models/notification.model';
import { EventService } from '../../business/services';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import StoreUtility from '../../utilities/core/store.utility';
import {
  unReadNotification,
  newNotificationReceived,
} from '../../redux/actions/notification.action';
import NoResults from '../../components/no-results/no-results.component';
import { Row, Col, Button } from 'antd';
import { GetTokenNotification } from '../../business/services/push-notification.service';
import AppInfiniteScroll from '../../components/app-infinite-scroll/app-infinite-scroll.component';
import LoadingHelper from '../../helpers/loading.helper';
import { UserTokenNotificationService } from '../../business/services/user-token-notification.service';

class NotificationPage extends Component {
  public notificationRequest = new PaginationBaseRequestModel();
  public norificationContainer = new Array<NotificationModel>();
  state = {
    notifications: new Array<NotificationModel>(),
    hasMoreItems: true,
    pageIndex: 0,
    hasToken: true,
  };

  constructor(props: any) {
    super(props);
    this.getNotification = this.getNotification.bind(this);
  }
  async componentDidMount() {
    await this.getNotification();
    await this.checkNotificationToken();
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
            {!this.state.hasToken && (
              <div className="page-section-header notification-box">
                <div>
                  <p>Notificarile tale sunt dezactivate!</p>

                  <div className="text-right">
                    <Button
                      onClick={e => this.allowNotification()}
                      className="notification-button"
                      type="primary"
                    >
                      Activare notificari
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="page-section page-section-large">
            <AppInfiniteScroll hasMore={this.state.hasMoreItems} next={this.getNotification}>
              {this.displayNotification()}
            </AppInfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
  async checkNotificationToken() {
    const tokenNotification = await GetTokenNotification(false);
    this.setState({
      hasToken: tokenNotification ? true : false,
    });
  }

  async allowNotification() {
    let notificationToken = await GetTokenNotification();
    if (notificationToken) {
      await UserTokenNotificationService.CreateToken(notificationToken);
      this.setState({
        hasToken: true,
      });
    }
  }

  displayNotification() {
    return this.state.notifications && this.state.notifications.length > 0 ? (
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
      ))
    ) : (
      <NoResults text="Nu ai nici o notificare" />
    );
  }

  private GenerateGradient(): string {
    const intR = Math.floor(Math.random() * 255) + 1;
    const intG = Math.floor(Math.random() * 255) + 1;
    const intB = Math.floor(Math.random() * 255) + 1;
    return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
  }

  private async getNotification() {
    LoadingHelper.showLoading();
    this.notificationRequest.pageIndex = this.state.pageIndex;
    let result = await NotificationService.Find(this.notificationRequest);

    this.norificationContainer.push(...result.Data);

    if (this.norificationContainer.length >= result.Total) {
      this.setState({
        hasMoreItems: false,
      });
    }

    this.SetNotification();
    LoadingHelper.hideLoading();
  }

  private SetNotification() {
    this.setState({
      notifications: this.norificationContainer,
      pageIndex: this.notificationRequest.pageIndex + 1,
    });
  }

  private async responseRequest(approve: boolean, notificationId: any) {
    this.norificationContainer = new Array<NotificationModel>();
    StoreUtility.store.dispatch(unReadNotification(0));
    this.setState({
      notifications: new Array<NotificationModel>(),
      hasMoreItems: true,
      pageIndex: 0,
    });
    approve
      ? await EventService.Approve(notificationId)
      : await EventService.Reject(notificationId);
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
    this.setState({
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

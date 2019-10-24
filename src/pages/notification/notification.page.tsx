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
import ColorHelper from '../../helpers/color.helper';

class NotificationPage extends Component {
  public notificationRequest = new PaginationBaseRequestModel();
  public notificationContainer = new Array<NotificationModel>();

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
          <div className="page-section">{this.getHeader()}</div>

          <div className="page-section">{this.getNotificationButton()}</div>

          <div className="page-section page-section-large">
            <AppInfiniteScroll
              hasMore={this.state.hasMoreItems}
              next={() => {
                this.getNotification();
              }}
            >
              {this.displayNotification()}
            </AppInfiniteScroll>
          </div>
        </div>
      </div>
    );
  }

  private getNotificationButton(): React.ReactNode {
    return (
      !this.state.hasToken && (
        <div className="notification-box">
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
      )
    );
  }

  private getHeader() {
    return (
      <div className="notification-section-header">
        <Row type="flex" align="middle">
          <Col span={12}>
            <h2>Notificari</h2>
          </Col>
          <Col span={12} className="text-right">
            {this.areUnreadEmails() ? (
              <div
                onClick={e => this.markAllAsRead()}
                className="icon mark-icon-button mdi mdi-email-check"
              ></div>
            ) : (
              <div className="icon mdi hidden mdi-email-check-outline"></div>
            )}
          </Col>
        </Row>
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
    const notificationToken = await GetTokenNotification();
    if (notificationToken) {
      await UserTokenNotificationService.CreateToken(notificationToken);
      this.setState({
        hasToken: true,
      });
    }
  }

  displayNotification() {
    return this.state.notifications && this.state.notifications.length > 0 ? (
      this.state.notifications.map((notification, index) => (
        <div
          key={index}
          className="event-list-item"
          style={{ backgroundImage: ColorHelper.generateUniqueGradient(notification.Id) }}
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

  private async getNotification(withClear: boolean = false) {
    LoadingHelper.showLoading();
    this.notificationRequest.pageIndex = withClear ? 0 : this.state.pageIndex;
    const result = await NotificationService.Find(this.notificationRequest);

    this.notificationContainer.push(...result.Data);
    const hasMoreItems = this.notificationContainer.length < result.Total;

    await this.SetNotification(hasMoreItems, withClear);
    LoadingHelper.hideLoading();
  }

  private async SetNotification(hasMoreItems: boolean, withClear: boolean) {
    const pageIndex = withClear ? 0 : this.state.pageIndex + 1;

    this.setState({
      notifications: this.notificationContainer,
      pageIndex,
      hasMoreItems,
    });
  }

  private async responseRequest(approve: boolean, notificationId: any) {
    LoadingHelper.showLoading();
    await this.clearNotificationContainer();

    approve
      ? await EventService.Approve(notificationId)
      : await EventService.Reject(notificationId);
    LoadingHelper.hideLoading();
    await this.getNotification(true);
  }

  private async clearNotificationContainer() {
    this.notificationContainer = new Array<NotificationModel>();
    StoreUtility.store.dispatch(unReadNotification(0));
  }

  private async RedirectToEventDetails(notificationId: string, eventId: any) {
    await NotificationService.MarkAsRead(notificationId);
    StoreUtility.store.dispatch(newNotificationReceived(-1));
    history.push('/details/' + eventId);
  }

  private async markAllAsRead() {
    await this.clearNotificationContainer();

    await NotificationService.MarkAllAsRead();
    await this.getNotification(true);
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

  private areUnreadEmails() {
    return this.state.notifications && this.state.notifications.some(x => x.Status === 0);
  }
}

export default NotificationPage;

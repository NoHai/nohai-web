import React, { Component } from 'react';
import './page-back-button.component.scss';
import history from '../../utilities/core/history';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import { NotificationService } from '../../business/services/notification.service';
import { connect } from 'react-redux';
import { unReadNotification } from '../../redux/actions/notification.action';

class PageBackButton extends Component<any, any> {
  private unlisten: any;
  state = { isMainPage: this.isMainPage() };

  public notification: any;
  public notificationRequest = new PaginationBaseRequestModel();

  async componentDidMount(): Promise<any> {
    this.notification = await NotificationService.Find(this.notificationRequest);
    this.props.unReadNotification(this.notification.CustomTotal);
    this.historyListen();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return this.state.isMainPage ? this.getNotificationIconButton() : this.getBackIconButton();
  }

  private historyListen(): void {
    this.unlisten = history.listen(() => {
      this.setState({ isMainPage: this.isMainPage() });
    });
  }

  private isMainPage(): boolean {
    const path = history.location.pathname;

    if (path !== '/') {
      return false;
    }

    return true;
  }

  private getNotificationIconButton(): any {
    return (
      <div
        onClick={() => {
          this.NavigateToNotification();
        }}
        className="icon mdi mdi-bell notification"
      >
        {this.props.unReadNotifications > 0 && (
          <span className="badge">{this.props.unReadNotifications || ''}</span>
        )}
      </div>
    );
  }

  private getBackIconButton(): any {
    return (
      <div
        onClick={() => {
          this.NavigateBack();
        }}
        className="icon mdi mdi-arrow-left"
      ></div>
    );
  }

  private NavigateToNotification(): void {
    history.push('/notification');
  }

  private NavigateBack() {
    history.replace('/', {});
  }
}
const mapStateToProps: any = (state: any) => {
  return {
    unReadNotifications: state.notificationReducer.unReadNotifications,
  };
};

const mapDispatchToProps: any = {
  unReadNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageBackButton);

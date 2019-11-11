import React, { Component } from 'react';
import './page-back-button.component.scss';
import HistoryHelper from '../../utilities/core/history';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import { NotificationService } from '../../business/services/notification.service';
import { connect } from 'react-redux';
import { unReadNotification } from '../../redux/actions/notification.action';

class PageBackButton extends Component<any, any> {
  private unlisten: any;
  state = { isMainPage: HistoryHelper.isMainPage() };

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
    this.unlisten = HistoryHelper.history.listen(() => {
      this.setState({ isMainPage: HistoryHelper.isMainPage() });
    });
  }

  private getNotificationIconButton(): any {
    return <div className="logo"></div>;
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

  private NavigateBack() {
    HistoryHelper.goBack();
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

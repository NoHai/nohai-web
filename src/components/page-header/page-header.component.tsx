import React, { Component } from 'react';
import './page-header.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import UserIconButton from '../user-icon-button/user-icon-button';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import { NotificationService } from '../../business/services/notification.service';
import { connect } from 'react-redux';
import { unReadNotification } from '../../redux/actions/notification.action';

class PageHeader extends Component<any, any> {
  state = { isMainPage: this.isMainPage() };
  public notification: any;
  public notificationRequest = new PaginationBaseRequestModel();

  private unlisten: any;

  async componentDidMount(): Promise<any> {
    this.notification = await NotificationService.Find(this.notificationRequest);
    this.props.unReadNotification(this.notification.CustomTotal);
    this.historyListen();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render(): any {
    return (
      <div className="page-header page-section">
        <Row>
          <Col span={8}>{this.getIcon()}</Col>

          <Col span={8} className="text-center" />

          <Col span={8} className="text-right">
            <UserIconButton />
          </Col>
        </Row>
      </div>
    );
  }

  private historyListen(): void {
    this.unlisten = history.listen(() => {
      this.setState({ isMainPage: this.isMainPage() });
    });
  }

  private getIcon(): any {
    return this.state.isMainPage ? this.getNotificationIconButton() : this.getBackIconButton();
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
          this.NavigateHome();
        }}
        className="icon mdi mdi-arrow-left"
      ></div>
    );
  }

  private NavigateToNotification(): void {
    history.push('/notification');
  }

  private NavigateHome() {
    history.replace('/', {});
  }

  private isMainPage(): boolean {
    const path = history.location.pathname;

    if (path !== '/') {
      return false;
    }

    return true;
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
)(PageHeader);

import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/auth.action';
import history from '../../utilities/core/history';
import HistoryHelper from '../../utilities/core/history';
import './user-icon-button.scss';
import { unReadNotification } from '../../redux/actions/notification.action';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import { NotificationService } from '../../business/services/notification.service';

class UserIconButton extends Component<any, any> {
  public notification: any;
  public notificationRequest = new PaginationBaseRequestModel();
  async componentDidMount(): Promise<any> {
    this.notification = await NotificationService.Find(this.notificationRequest);
    this.props.unReadNotification(this.notification.CustomTotal);
  }
  render() {
    const menu = (
      <Menu className="menu-item">
        <Menu.Item key="0"  onClick={() => this.NavigateToProfile()}>
          Profil 
        </Menu.Item>
        
        <Menu.Item key="1" className="menu-item" onClick={() => this.props.logout()}>
          Deconectare
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="user-icon-buttons">
        <div
        onClick={() => {
          this.NavigateToNotification();
        }}
        className="icon mdi mdi-bell user-icon-buttons notification"
      >
        {this.props.unReadNotifications > 0 && (
          <span className="badge">{this.props.unReadNotifications || ''}</span>
        )}
      </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div
            className="icon mdi mdi-dots-vertical"
          />
        </Dropdown>
      </div>
    );
  }
  private NavigateToProfile() {
    history.push('/profile');
  }

  private NavigateToNotification(): void {
    HistoryHelper.push('/notification');
  }
}

const mapStateToProps: any = (state: any) => {
  return {
    unReadNotifications: state.notificationReducer.unReadNotifications,
  };
};

const mapDispatchToProps = {
  logout,
  unReadNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIconButton);

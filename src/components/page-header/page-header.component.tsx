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
    public notification: any;
    public notificationRequest = new PaginationBaseRequestModel();
    async componentDidMount() {
        this.notification = await NotificationService.Find(this.notificationRequest);
        this.props.unReadNotification(this.notification.Total);
    }
    render() {
        return (
            <div className="page-header page-section">
                <Row>
                    <Col span={8}>
                        <div
                            onClick={() => {
                                this.NavigateToNotification();
                            }}
                            className="icon mdi mdi-bell notification"
                        >
                            <span className="badge">{this.props.unReadNotifications || ''}</span>
                        </div>
                    </Col>
                    <Col span={8} className="text-center" />
                    <Col span={8} className="text-right">
                        <UserIconButton />
                    </Col>
                </Row>
            </div>
        );
    }

    private NavigateToNotification() {
        history.push('/notification');
    }
}
const mapStateToProps = (state: any) => {
    return {
        unReadNotifications: state.notificationReducer.unReadNotifications,
    };
};

const mapDispatchToProps = {
    unReadNotification,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageHeader);

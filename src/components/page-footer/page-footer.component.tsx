import React, { Component } from 'react';
import './page-footer.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';


class PageFooter extends Component {
    render() {
        return (
            <div className="page-footer page-section">
                <Row type="flex" align="middle">
                    <Col span={8} className="text-center">
                        <div className="icon mdi mdi-ticket" />
                    </Col>
                    <Col span={8} className="text-center">
                        <div
                            className="icon icon-large active mdi mdi-plus-circle"
                            onClick={() => {
                                this.NavigateToNotification();
                            }}
                        />
                    </Col>
                    <Col span={8} className="text-center">
                        <div className="icon mdi mdi-history" />
                    </Col>
                </Row>
            </div>
        );
    }

    private NavigateToNotification() {
        LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
        history.push('/create-event');
    }
}

export default PageFooter;

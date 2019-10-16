import React, { Component } from 'react';
import './page-footer.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import HistoryHelper from '../../utilities/core/history';

class PageFooter extends Component {
  render() {
    const homeClass = HistoryHelper.checkPath('/')
      ? 'active mdi-home'
      : 'mdi-home-outline';
    const createEventClass = HistoryHelper.containsPath('/create-event')
      ? 'active mdi-plus-circle'
      : 'mdi-plus-circle-outline';
    const eventHistoryClass = HistoryHelper.checkPath('/events-history')
      ? 'active mdi-ticket'
      : 'mdi-ticket-outline';

    return (
      <div className="page-footer page-section">
        <Row type="flex" align="middle">
          <Col span={8} className="text-center">
            <div
              className={`icon mdi ${homeClass}`}
              onClick={() => {
                this.NavigateToEvents();
              }}
            />
          </Col>
          <Col span={8} className="text-center">
            <div
              className={`icon mdi ${createEventClass}`}
              onClick={() => {
                this.NavigateToCreateEvent();
              }}
            />
          </Col>
          <Col span={8} className="text-center">
            <div
              className={`icon mdi ${eventHistoryClass}`}
              onClick={() => {
                this.NavigateToHistoryEvents();
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }

  private NavigateToCreateEvent() {
    LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
    history.push('/create-event');
  }
  private NavigateToEvents() {
    history.push('/');
  }

  private NavigateToHistoryEvents() {
    history.push('/events-history');
  }
}

export default PageFooter;

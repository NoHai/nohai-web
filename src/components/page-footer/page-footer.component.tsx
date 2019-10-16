import React, { Component } from 'react';
import './page-footer.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import HistoryHelper from '../../utilities/core/history';

class PageFooter extends Component {
  render() {
    const isHomeActive = HistoryHelper.checkPath('/');
    const isCreateEventActive = HistoryHelper.containsPath('/create-event');
    const isHistoryActive = HistoryHelper.checkPath('/events-history');

    const homeClass = isHomeActive ? 'mdi-ticket' : 'mdi-ticket-outline';
    const createEventClass = isCreateEventActive ? 'mdi-plus-circle' : 'mdi-plus-circle-outline';
    const eventHistoryClass = isHistoryActive ? 'mdi-calendar-star' : 'mdi-calendar-blank-outline';

    return (
      <div className="page-footer page-section">
        <Row type="flex" align="middle">
          <Col span={8} className="text-center">
            <div
              className={`page-footer-link ${isHomeActive ? 'active' : ''}`}
              onClick={() => {
                this.NavigateToEvents();
              }}
            >
              <span className={`icon mdi ${homeClass}`} />
              <div className="page-footer-text">Evenimente</div>
            </div>
          </Col>

          <Col span={8} className="text-center">
            <div
              className={`page-footer-link ${isCreateEventActive ? 'active' : ''}`}
              onClick={() => {
                this.NavigateToCreateEvent();
              }}
            >
              <span className={`icon mdi ${createEventClass}`} />
              <div className="page-footer-text">Adauga eveniment</div>
            </div>
          </Col>

          <Col span={8} className="text-center">
            <div
              className={`page-footer-link ${isHistoryActive ? 'active' : ''}`}
              onClick={() => {
                this.NavigateToHistoryEvents();
              }}
            >
              <span className={`icon mdi ${eventHistoryClass}`} />
              <div className="page-footer-text">Istoric</div>
            </div>
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

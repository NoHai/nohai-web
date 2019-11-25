import React, { Component } from 'react';
import './event-info.page.scss';
import { Button } from 'antd';
import HistoryHelper from '../../../utilities/core/history';

class EventInfoPage extends Component {
  componentDidMount() {}
  public render() {
    const isEdited= HistoryHelper.containsPath('/edit-event-info');
    return (
      <div className="event-info">
        <div className="event-info-icon"></div>

        <div className="info-message">{isEdited? 'Evenimentul a fost modificat' : 'Evenimentul dumveavoastra a fost creat!'}</div>

        <Button type="primary" onClick={() => this.goHome()}>
          Am inteles
        </Button>
      </div>
    );
  }

  private goHome() {
    HistoryHelper.goHome();
  }
}

export default EventInfoPage;

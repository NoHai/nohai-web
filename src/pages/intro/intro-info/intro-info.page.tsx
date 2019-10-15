import React, { Component } from 'react';
import './intro-info.page.scss';
import { Button } from 'antd';
import history from '../../../utilities/core/history';

class IntroInfoPage extends Component {
  render() {
    return (
      <div className="intro-info">
        <div className="page-sections">
          <div className="page-section page-section-large">
            <div className="intro-info-image" />
            <h1>Bine ai venit</h1>

            <p>
               Pentru a iti sugera cele mai bune evenimente, avem nevoie de
              cateva informatii referitoare la ceea ce iti place sa faci.
            </p>

            <Button
              type="primary"
              size="large"
              onClick={() => {
                this.GoForward();
              }}
            >
              Hai sa incepem
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private GoForward() {
    history.push('/intro/step-one');
  }
}

export default IntroInfoPage;

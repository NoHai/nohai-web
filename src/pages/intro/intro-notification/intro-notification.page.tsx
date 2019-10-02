import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Button } from 'antd';
import './intro-notification.page.scss';
import { GetTokenNotification } from '../../../business/services/push-notification.service';
import { UserTokenNotificationService } from '../../../business/services/user-token-notification.service';
import CreateEventHeaderComponent from '../../../components/create-event-header/create-event-header';

class IntroLocation extends Component<any, any> {
  render() {
    return (
      <div className="intro-notification-page">
        <div className="intro-step-page">
          <div className="page-sections">
            <div className="page-section page-section-large">
              <CreateEventHeaderComponent
                title={'Notificari'}
                iconClass={'icon mdi mdi-bell notification'}
              />

              <div className="align-middle">
                <p className="margin-bottom invert">
                  Pentru a te putea tine la curent cu toate evenimentele care te privesc avem nevoie
                  de permisiune ta pentru a-ti putea trimite notificari
                </p>

                <div className="buttons">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      this.allowNotification();
                    }}
                  >
                    Porneste notificarile
                  </Button>
                </div>
              </div>
            </div>

            <div className="page-section page-section-footer">
              <div className="intro-footer text-center">
                <div
                  className="skip-button"
                  onClick={() => {
                    this.skipNotification();
                  }}
                >
                  Sari peste
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async allowNotification() {
    let notificationToken = await GetTokenNotification();
    UserTokenNotificationService.CreateToken(notificationToken);
    history.push('/');
  }

  private async skipNotification() {
    history.push('/');
  }
}

export default IntroLocation;

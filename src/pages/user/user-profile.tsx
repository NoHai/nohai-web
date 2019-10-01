import React, { Component } from 'react';
import './user-profile.scss';
import { Input, Card, Row, Col } from 'antd';
import { UserService } from '../../business/services';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import moment from 'moment';
import AvatarHelper from '../../helpers/avatar.helper';

class UserProfilePage extends Component {
  state = {
    userDetails: new UserViewModel(),
  };

  async componentDidMount(): Promise<void> {
    let userDetails: UserViewModel = await UserService.Get();
    this.setState({
      userDetails: userDetails,
    });
  }

  render(): any {
    const loading: boolean = !this.state.userDetails.user;
    const age: number | string =
      moment().diff(moment(this.state.userDetails.details.Day, 'DD/MM/YYYY'), 'years') || '';

    return (
      <div className="user-profile full-height">
        <div className="page-sections">
          <div className="page-section page-section-large">
            <div className="text-align">
              <div
                className="dot avatar"
                style={{
                  backgroundImage: `url(${AvatarHelper.get(this.state.userDetails.user.Url, 150)})`,
                }}
              ></div>
            </div>

            <div className="name">
              {this.state.userDetails.user.FirstName || ''}{' '}
              {this.state.userDetails.user.LastName || ''}
            </div>

            <div className="user-profile-content">
              <Card loading={loading}>
                <div className="margin-bottom">
                  <h3>Despre</h3>
                  <div className="inline-input-wrapper">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8}>
                        <label>Inaltime:</label>
                      </Col>
                      <Col span={16}>
                        <Input readOnly value={this.state.userDetails.details.Height || ''}></Input>
                      </Col>
                    </Row>
                  </div>

                  <div className="inline-input-wrapper">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8}>
                        <label>Greutate:</label>
                      </Col>
                      <Col span={16}>
                        <Input readOnly value={this.state.userDetails.details.Weight || ''}></Input>
                      </Col>
                    </Row>
                  </div>

                  <div className="inline-input-wrapper">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8}>
                        <label>Zi de naspere:</label>
                      </Col>
                      <Col span={16}>
                        <Input readOnly value={this.state.userDetails.details.Day || ''}></Input>
                      </Col>
                    </Row>
                  </div>

                  <div className="inline-input-wrapper">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8}>
                        <label>Varsta:</label>
                      </Col>
                      <Col span={16}>
                        <Input readOnly value={age}></Input>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div>
                  <h3>Contact</h3>
                  <div className="inline-input-wrapper">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={8}>
                        <label>Email:</label>
                      </Col>
                      <Col span={16}>
                        <Input readOnly value={this.state.userDetails.user.Email || ''}></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;

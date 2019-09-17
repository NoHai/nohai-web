import React, { Component } from 'react';
import './user-profile.scss';
import { Input } from 'antd';
import { UserService } from '../../business/services';
import { UserViewModel } from '../../contracts/view-models/user-view.model';

class UserProfilePage extends Component {
    state = {
        userDetails: new UserViewModel(),
    };

    async componentDidMount() {
        let userDetails = await UserService.Get();
        this.setState({
            userDetails: userDetails,
        });
    }
    render() {
        return (
            <div className="user-profile full-height">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <div className="text-align">
                            <div
                                className="dot avatar"
                                style={{
                                    backgroundImage:
                                        'url(https://randomuser.me/api/portraits/women/65.jpg)',
                                }}
                            ></div>
                        </div>
                        <div>
                            <div className="name">
                                {this.state.userDetails.user.FirstName} {this.state.userDetails.user.LastName}
                            </div>
                            <label>Despre</label>
                            <div className="inline-input-wrapper">
                                <span>Inaltime:</span>
                                <Input
                                    readOnly
                                    value={this.state.userDetails.details.Height}
                                ></Input>
                            </div>
                            <div className="inline-input-wrapper">
                                <span>Zi de naspere:</span>
                                <Input readOnly value={this.state.userDetails.details.Day}></Input>
                            </div>
                            <div className="inline-input-wrapper">
                                <span>Varsta:</span>
                                <Input readOnly value={this.state.userDetails.details.Day}></Input>
                            </div>
                            <label>Contact</label>
                            <div className="inline-input-wrapper">
                                <span>Email:</span>
                                <Input readOnly value="daniel.ilie@edelcode.com"></Input>
                            </div>
                            <div className="inline-input-wrapper">
                                <span>Telefon:</span>
                                <Input readOnly value="0720175028"></Input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfilePage;

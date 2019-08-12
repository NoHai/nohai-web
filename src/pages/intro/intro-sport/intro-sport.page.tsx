import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Row, Col, Button } from 'antd';
import SportsSelection from '../../../components/sports-selection/sports-selection.component';
import { UserService } from '../../../business/services/user.service';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../helpers/local-storage.helper';

class IntroSport extends Component<any, any> {
    state = {
        registerDetails: new UserViewModel(),
    };
    componentDidMount() {
        this.setState({
            registerDetails: LocalStorageHelper.GetItemFromLocalStorage(
                LocalStorage.IntroInfo,
                this.state.registerDetails
            ),
        });
    }

    async onCloseDrawer(sport: string, level: string) {
        this.setState((prevState: any) => ({
            registerDetails: {
                ...prevState.registerDetails,
                details: {
                    ...prevState.registerDetails.details,
                    Level: level,
                    Sport: sport,
                },
            },
        }));
    }

    render() {
        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large page-section-with-color align-middle">
                        <h1 className="invert">De ce sport esti pasionat?</h1>

                        <p className="invert margin-bottom">
                            Alege sporturile de care esti pasionat si nivelul la care esti. <br />
                            Pe baza sporturilor selectate iti vom genera timeline-ul
                        </p>

                        <SportsSelection
                            sport={this.state.registerDetails.details.Sport}
                            level={this.state.registerDetails.details.Level}
                            onCloseDrawer={(sport, level) => this.onCloseDrawer(sport, level)}
                        />
                    </div>

                    <div className="page-section page-section-footer">
                        <div className="intro-footer">
                            <Row>
                                <Col span={12}>
                                    <Button
                                        type="default"
                                        onClick={() => {
                                            this.GoBack();
                                        }}
                                    >
                                        Pasul anterior
                                    </Button>
                                </Col>
                                <Col span={12} className="text-right">
                                        <Button
                                        disabled={this.state.registerDetails.details.Level===undefined}
                                            type="primary"
                                            onClick={() => {
                                                this.GoForward();
                                            }}
                                        >
                                            Finish
                                        </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private async GoForward() {
        const result = await UserService.Update(this.state.registerDetails);
        if (result.Id) {
            LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.IntroInfo);
            history.push('/');
        }
    }

    private GoBack() {
        LocalStorageHelper.SaveItemToLocalStorage(
            LocalStorage.IntroInfo,
            this.state.registerDetails
        );
        history.push('/intro/step-two');
    }
}

export default IntroSport;

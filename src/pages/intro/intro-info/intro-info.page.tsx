import React, { Component } from 'react';
import './intro-info.page.scss';
import { Button } from 'antd';
import history from '../../../utilities/history';

class IntroInfoPage extends Component {
    render() {
        return (
            <div className="intro-info">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <div className="intro-info-image" />
                        <h1>Aproape am terminat</h1>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, culpa
                            dolores architecto ipsam repellendus sequi quod aperiam dolore aliquam
                            quo! In deserunt sed aliquam vero at, architecto.
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

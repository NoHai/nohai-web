import React, { Component } from 'react';
import './slider.component.scss';
import { Row, Col } from 'antd';
import SportsSelection from '../sports-selection/sports-selection.component';
import { EventFormModel } from '../../contracts/models';


class SliderComp extends Component {
    public eventForm=new EventFormModel();
    state = {
        slides: [
            <div className="inline-input-wrapper">
                <div >
                    <Row>
                        <Col span={6}>
                            <span>Sportul:</span>
                        </Col>
                        <Col span={18}>
                            <SportsSelection />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col span={10}>
                            <span>Total Locuri:</span>
                        </Col>
                        <Col span={12}>
                            <input type="text" placeholder="Total Locuri" data-lpignore="true" />
                        </Col>
                    </Row>
                </div>

                <div >
                <Row>
                        <Col span={12}>
                    <span>Locuri Disponibile:</span>
                    </Col>
                        <Col span={12}>
                    <input type="number" placeholder="Locuri Disponibile" data-lpignore="true" value={this.eventForm.FreeSpots} onChange={this.onChangeHendller} />
                    </Col>
                    </Row>
                </div>

                <div>
                    <span>Pret Participant:</span>
                    <input type="text" placeholder="Pret Participant" data-lpignore="true" />
                </div>
            </div>,
            <div>
                <label>Alege locatia evenimentului</label>
                <div className="inline-input-wrapper">
                    <span>Judetul</span>
                    <input type="text" placeholder="Judet" data-lpignore="true" />
                </div>

                <div className="inline-input-wrapper">
                    <span>Orasul:</span>
                    <input type="text" placeholder="Oras" data-lpignore="true" />
                </div>

                <div className="inline-input-wrapper">
                    <span>Adresa:</span>
                    <input type="text" placeholder="Adresa" data-lpignore="true" />
                </div>
            </div>,
            <div>
                <div className="inline-input-wrapper">
                    <span>Descrierea evenimentului</span>
                    <textarea rows={7} cols={30} data-lpignore="true" />
                </div>
            </div>,
        ],
        currentIndex: 0,
        sport:"",
        totalParticipants:0,
        spotsLeft:0,
        priceParticipant:0,
    };

    onChangeHendller(){

    }

    goToPrevSlide(prevIndex: number) {
        if (this.state.currentIndex === 0) return;

        this.setState({
            currentIndex: prevIndex - 1,
        });
    }

    goToNextSlide(prevIndex: number) {
        if (this.state.currentIndex === this.state.slides.length - 1) {
            return this.setState({});
        }

        this.setState({
            currentIndex: prevIndex + 1,
        });
    }

    public render() {
        return (
            <div className="slider-component page-sections">
                <div className="page-section page-section-large">
                    <div> {this.state.slides[this.state.currentIndex]}</div>
                </div>

                <div className="page-section page-section slider-buttons">
                    <Row>
                        <Col span={12}>
                            <div
                                className="arrow-button mdi mdi-arrow-left-bold-circle-outline"
                                onClick={() => {
                                    this.goToPrevSlide(this.state.currentIndex);
                                }}
                            />
                        </Col>
                        <Col span={12} className="text-right">
                            <div
                                className="arrow-button mdi mdi-arrow-right-bold-circle-outline"
                                onClick={() => {
                                    this.goToNextSlide(this.state.currentIndex);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default SliderComp;

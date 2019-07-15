import React, { Component, Props } from 'react';
import './slider.component.scss';
import { Row, Col } from 'antd';
import { validate } from 'class-validator';
import LocationComponent from './location/location.component';
import { EventDetailsViewModel } from '../../contracts/models';
import ParticipantsEventCompoent from './participants/participants-event.component';
import { connect } from 'react-redux';
import { changeCreateEventSlide } from '../../redux/actions/event.action';

class SliderComp extends Component<any, any> {
    constructor(props: Props<any>) {
        super(props);

        this.state = {
            currentIndex: 0,
            eventDetails: new EventDetailsViewModel(),
            slides: [],
            errors: [],
        };
    }

    componentDidMount() {
        let slides = this.getSlides();
        this.setState({
            slides,
        });
    }

    public getSlides() {
        return [
            <div className="inline-input-wrapper">
                <ParticipantsEventCompoent />
            </div>,
            <div>
                <LocationComponent />
            </div>,
            <div>
                <div className="inline-input-wrapper">
                    <span>Descrierea evenimentului</span>
                    <textarea rows={7} cols={30} data-lpignore="true" />
                </div>
            </div>,
        ];
    }

    goToPrevSlide(prevIndex: number) {
        if (this.props.currentSlide === 0) return;

        changeCreateEventSlide(this.props.currentSlide - 1);
    }

    async goToNextSlide(prevIndex: number) {
        if (this.props.CanSlide) {
            changeCreateEventSlide(this.props.currentSlide + 1);
        }

        if (this.props.currentSlide === this.state.slides.length - 1) {
            return this.setState({});
        }

        if (prevIndex === 0) {
            let errors = await validate(this.state.eventDetails.participantsDetails);

            if (errors.length > 0) {
                console.log('validation failed. errors: ', errors);

                this.setState((prevState: any) => ({
                    eventDetails: {
                        ...prevState.eventDetails,
                        participantsDetails: {},
                    },
                }));
            } else {
                this.setState({
                    currentIndex: prevIndex + 1,
                });
            }
        }
        if (prevIndex === 1) {
            let errors2 = await validate(this.state.eventDetails.locationDetails);

            if (errors2.length > 0) {
                console.log('validation failed. errors: ', errors2);
            } else {
                this.setState({
                    currentIndex: prevIndex + 1,
                });
            }
        }
    }

    public render() {
        let slides = this.getSlides();

        return (
            <div className="slider-component page-sections">
                <div className="page-section page-section-large">
                    <div> {slides[this.props.currentSlide]}</div>
                </div>

                <div className="page-section page-section slider-buttons">
                    <Row>
                        <Col span={12}>
                            <div
                                className="arrow-button mdi mdi-arrow-left-bold-circle-outline"
                                onClick={() => {
                                    this.goToPrevSlide(this.props.currentSlide);
                                }}
                            />
                        </Col>
                        <Col span={12} className="text-right">
                            <div
                                className="arrow-button mdi mdi-arrow-right-bold-circle-outline"
                                onClick={async () => {
                                    this.goToNextSlide(this.props.currentSlide);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ eventReducer }: any) => {
    if (!!eventReducer) {
        switch (eventReducer.currentSlide) {
            case 1:
                eventReducer.CanSlide = eventReducer.eventDetails.Location.IsValid;
                break;
        }

        return {
            currentSlide: eventReducer.currentSlide,
            eventDetails: eventReducer.eventDetails,
        };
    }
};

const mapDispatchToProps = {
    changeCreateEventSlide,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SliderComp);

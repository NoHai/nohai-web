import React, { Component, Props } from 'react';
import './slider.component.scss';
import { Row, Col } from 'antd';
import LocationComponent from '../location/location.component';
import DescriptionEventComponent from '../description/description.component';
import ParticipantsEventCompoent from '../participants/participants-event.component';
import { connect } from 'react-redux';
import { changeCreateEventSlide } from '../../../redux/actions/event.action';
import { SlidesEventEnum } from '../../../contracts/enums/events';
import {} from '../description/description.component';

class SliderComp extends Component<any, any> {
    constructor(props: Props<any>) {
        super(props);

        this.state = {
            slides: [],
        };
    }

    componentDidMount() {
        let slides = this.getSlides();
        this.setState({
            slides,
        });
    }

    public getSlides() {
        switch (this.props.currentSlide) {
            case SlidesEventEnum.ParticipantDetails:
                return (
                    <div className="inline-input-wrapper">
                        <ParticipantsEventCompoent />
                    </div>
                );
            case SlidesEventEnum.LocationDetails:
                return (
                    <div className="inline-input-wrapper">
                        <LocationComponent />
                    </div>
                );
            case SlidesEventEnum.Description:
                return (
                    <div className="inline-input-wrapper">
                        <DescriptionEventComponent />
                    </div>
                );
        }
    }

    goToPrevSlide(prevIndex: number) {
        if (prevIndex === 0) return;
        this.props.changeCreateEventSlide(prevIndex - 1);
    }

    goToNextSlide(prevIndex: number) {
        if (prevIndex !== 2) {
            if (this.props.canSlide) {
                this.props.changeCreateEventSlide(prevIndex + 1);
            }
        }
    }

    public render() {
        return (
            <div className="event-list-item full-height">
                <div className="page-sections">
                    <div className="page-section">
                        <div className="slide-title">
                            Detalii participantii
                            <div className="icon mdi mdi-account-group" />
                        </div>
                    </div>
                    <div className="page-section page-section-large">
                        <div className="item-card event-card">a</div>
                    </div>
                    <div className="page-section">b</div>
                </div>
            </div>

            // <div className="slider-component page-sections">
            //     <div className="page-section page-section-large">
            //         <div> {this.getSlides()}</div>
            //     </div>

            //     <div className="page-section page-section slider-buttons">
            //         <Row>
            //             <Col span={12}>
            //                 <div
            //                     className="arrow-button mdi mdi-arrow-left-bold-circle-outline"
            //                     onClick={() => {
            //                         this.goToPrevSlide(this.props.currentSlide);
            //                     }}
            //                 />
            //             </Col>
            //             <Col span={12} className="text-right">
            //                 <div
            //                     className="arrow-button mdi mdi-arrow-right-bold-circle-outline"
            //                     onClick={() => {
            //                         this.goToNextSlide(this.props.currentSlide);
            //                     }}
            //                 />
            //             </Col>
            //         </Row>
            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = ({ eventReducer }: any) => {
    if (!!eventReducer) {
        switch (eventReducer.currentSlide) {
            case SlidesEventEnum.ParticipantDetails:
                eventReducer.canSlide = eventReducer.eventDetails.participantsDetails.IsValid;
                break;
            case SlidesEventEnum.LocationDetails:
                eventReducer.canSlide = eventReducer.eventDetails.locationDetails.IsValid;
                break;
            case SlidesEventEnum.Description:
                eventReducer.canSlide = eventReducer.eventDetails.description.IsValid;
                break;
        }

        return {
            currentSlide: eventReducer.currentSlide,
            eventDetails: eventReducer.eventDetails,
            canSlide: eventReducer.canSlide,
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

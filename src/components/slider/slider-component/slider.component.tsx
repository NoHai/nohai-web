import React, { Component } from 'react';
import './slider.component.scss';
import LocationComponent from '../location/location.component';
import DescriptionEventComponent from '../description/description.component';
import ParticipantsEventCompoent from '../participants/participants-event.component';
import SlideesTitleComponent from '../slides-title/slides-title.component';
import { connect } from 'react-redux';
import { changeCreateEventSlide } from '../../../redux/actions/event.action';
import { SlidesEventEnum } from '../../../contracts/enums/events';
import history from '../../../utilities/core/history';
import { Row, Col, Button, Icon } from 'antd';

class SliderComp extends Component<any, any> {
    public getSlides() {
        switch (this.props.currentSlide) {
            case SlidesEventEnum.ParticipantDetails:
                return <ParticipantsEventCompoent />;
            case SlidesEventEnum.LocationDetails:
                return <LocationComponent />;
            case SlidesEventEnum.Description:
                return <DescriptionEventComponent />;
        }
    }

    public getTitle(slide: number) {
        const title = {
            name: '',
            iconClass: '',
        };
        switch (slide) {
            case SlidesEventEnum.ParticipantDetails:
                title.iconClass = 'icon mdi mdi-account-group';
                title.name = 'Detalii participantii';
                return title;
            case SlidesEventEnum.LocationDetails:
                title.iconClass = 'icon mdi mdi-map-marker-plus';
                title.name = 'Detalii locatie';
                return title;
            case SlidesEventEnum.Description:
                title.iconClass = 'icon mdi mdi-clipboard-outline';
                title.name = 'Descriere eveniment';
                return title;
        }
    }

    goToPrevSlide(prevIndex: number) {
        if (prevIndex === 0) return;
        let title = this.getTitle(prevIndex - 1);
        if (title) {
            this.props.changeCreateEventSlide(prevIndex - 1, title.name, title.iconClass);
        }
    }

    goToNextSlide(prevIndex: number) {
        if (prevIndex !== 2) {
            if (this.props.canSlide) {
                let title = this.getTitle(prevIndex + 1);
                if (title) {
                    this.props.changeCreateEventSlide(prevIndex + 1, title.name, title.iconClass);
                }
            }
        }
    }

    CheckForms() {
        if (
            this.props.eventDetails.locationDetails.IsValid &&
            this.props.eventDetails.participantsDetails.IsValid &&
            this.props.eventDetails.description.IsValid &&
            this.props.currentSlide === 2
        ) {
            return true;
        } else {
            return false;
        }
    }
    goToDetails() {
        history.push('/preview')
    }

    public render() {
        return (
            <div className="slider-component event-list-item full-height">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <SlideesTitleComponent />
                        <div className="item-card event-card">{this.getSlides()}</div>
                    </div>
                    <div className="page-section slider-buttons">
                        <Row>
                            <Col span={12}>
                                {this.props.currentSlide !== 0 && (
                                    <Button
                                        className="arrow-button"
                                        type="link"
                                        onClick={() => {
                                            this.goToPrevSlide(this.props.currentSlide);
                                        }}
                                    >
                                        <Icon type="left" />
                                        Inapoi
                                    </Button>
                                )}
                            </Col>
                            <Col span={12} className="text-right">
                                {this.props.currentSlide !== 2 && (
                                    <Button
                                        className="arrow-button"
                                        type="link"
                                        onClick={() => {
                                            this.goToNextSlide(this.props.currentSlide);
                                        }}
                                    >
                                        Inainte
                                        <Icon type="right" />
                                    </Button>
                                )}
                                {this.CheckForms() && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.goToDetails();
                                        }}
                                    >
                                        Vizualizeaza
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
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

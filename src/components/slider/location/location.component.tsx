import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action'; 

class LocationComponent extends Component<any,any> {


    handleChange(event: any) {
        const { name, value } = event.target;
        let locationDetail: any = this.props.eventDetails.locationDetail;

        locationDetail[name] = value;
        this.props.eventDetails.locationDetail=locationDetail
        changeEventDetails(this.props.eventDetails)
    }

    public render() {
        return (
            <div>
                <span>Alege locatia evenimentului</span>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Judetul:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Judet"
                                data-lpignore="true"
                                name="District"
                                value={this.props.eventDetails.locationDetail.District}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Orasul:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Oras"
                                data-lpignore="true"
                                name="City"
                                value={this.props.eventDetails.locationDetail.City}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Adresa:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Adresa"
                                data-lpignore="true"
                                name="Address"
                                value={this.props.eventDetails.locationDetail.Address}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ eventReducer }: any) => {
    return {
        eventDetails: eventReducer.eventDetails,
    };
};

const mapDispatchToProps = {
    changeEventDetails,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationComponent);
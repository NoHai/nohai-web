import React, { Component } from 'react';
import './slides-title.component.scss';
import { connect } from 'react-redux';
class SlideesTitleComponent extends Component<any, any> {
    public render() {
        return (
            <div className="slide-title">
                {this.props.title}
                <div className={this.props.iconClass} />
            </div>
        );
    }
}

const mapStateToProps = ({ eventReducer }: any) => {
    if (!!eventReducer) {
        return {
            title: eventReducer.title,
            iconClass: eventReducer.iconClass,
        };
    }
};

export default connect(
    mapStateToProps,
)(SlideesTitleComponent);


import React, { Component } from 'react';

class EventMap extends Component {
    render() {
        return (
            <div className="event-map">
                <iframe
                    width="100%"
                    height="250"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.6589010191656!2d24.128555115933224!3d45.77802577910592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c5d65ef8a2b6d%3A0xcff9777dc2388955!2sStrada+General+Eremia+Grigorescu%2C+Sibiu!5e0!3m2!1sen!2sro!4v1552129755375"
                    scrolling="no"
                    style={{ border: 0 }}
                />
            </div>
        );
    }
}

export default EventMap;

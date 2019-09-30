import React, { Component } from 'react';

class AppLoading extends Component {
  render(): any {
    return (
      <div className="loading-wrapper active">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default AppLoading;

import React, { Component } from 'react';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import HistoryHelper from '../../../../utilities/core/history';

class ClearStoragePage extends Component<any, any> {
  componentDidMount() {
    this.clearSiteData();
  }

  render() {
    return <div></div>;
  }

  private clearSiteData() {
    LocalStorageHelper.DeleteLocalStorage();
    LocalStorageHelper.DeleteTokenSession();

    HistoryHelper.goHome();
  }
}

export default ClearStoragePage;

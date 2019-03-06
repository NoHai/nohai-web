import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './wrapper.page.scss';
import SearchEventsPage from '../../event/search-events/search-events.page';
import PageNotFound from '../not-found/not-found.page';
import PageHeader from '../../../components/page-header/page-header.component';
import PageFooter from '../../../components/page-footer/page-footer.component';

class WrapperPage extends Component {
    public render() {
        return (
            <div className="page-wrapper page-sections">
                <PageHeader />

                <div className="page-wrapper-content page-section page-section-large">
                    <Switch>
                        <Route exact path="/" component={SearchEventsPage} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>

                <PageFooter />
            </div>
        );
    }
}

export default WrapperPage;
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
//import injectTapEventPlugin from 'react-tap-event-plugin';

import AppPage from '../../pages/AppPage';
import ListPage from '../../pages/ListPage';
import IndexPage from '../../pages/IndexPage';
import ItemPage from '../../pages/ItemPage';
import VideoPage from '../../pages/VideoPage';
//injectTapEventPlugin();

function onupdate(e) {
    window.scrollTo(0, 0);
}

ReactDOM.render(
    <Router history={browserHistory} onUpdate={onupdate()}>

    <Route path="/" component={AppPage}>
        <IndexRoute component={IndexPage}/>
        <Route path="v/:itemKey" component={ItemPage}/>
        <Route path="yt/:itemKey" component={VideoPage}/>
        <Route path="/account" component={ItemPage}/>

        <Route path=":listName" component={ListPage}/>
    </Route>

</Router>, document.getElementById('splash-app'));

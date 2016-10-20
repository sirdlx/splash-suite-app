import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import IndexPage from './pages/IndexPage';
import AddPage from './pages/AddPage';
import ItemPage from './pages/ItemPage';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
        <IndexRoute component={IndexPage}/>
        <Route path="add" component={AddPage}/>
        <Route path="item/:itemKey" component={ItemPage}/>
    </Route>
</Router>, document.getElementById('root'));

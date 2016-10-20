import React from 'react';
const feathers = require('feathers/client');
import socketio from 'feathers-socketio/client';
const rx = require('feathers-reactive');
const RxJS = require('rxjs');

//import {getColorClass, getTextColorClass} from '../util';
import PlayCard from '../views/playCard';
import ItemCard from '../views/itemCard';
import AppNavDrawer from '../views/AppNavDrawer';
import FullWidthSection from '../views/FullWidthSection';
// import AppFooter from './footer'; import {Link} from 'react-router'; import
// classNames from 'classnames'; import darkBaseTheme from
// 'material-ui/styles/baseThemes/darkBaseTheme';
import {
    darkWhite,
    //lightWhite, grey900
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            messages: [],
            activeHeaderTab: 0,
            navDrawerOpen: false
        }
        this.onChangeHeaderTab = this
            .onChangeHeaderTab
            .bind(this);
    }

    onChangeHeaderTab(tabId) {

        this.setState({activeHeaderTab: tabId});
    }

    renderActiveTabContent() {
        switch (this.state.activeHeaderTab) {
            case 0:
                return this.renderTabOverview();
            case 1:
                return this.renderCardList();
            default:
                return <div>Nothing to see here :-)</div>;
        }
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    loadCommentsFromServer() {

        const socket = window.io('http://localhost:9901');
        const app = feathers()
        // Set up socket.io
            .configure(socketio(socket))
            .configure(rx(RxJS))

        // // Register hooks module app.configure(feathers.hooks()); // Register
        // socket.io
        //
        // // Set up authentication with a store to cache your auth token
        // app.configure(feathers.authentication({     storage: window.localStorage }));

        const itemsService = app.service('items');

        itemsService.on('created', function (item) {
            console.log('Someone created a item', item);
        });

        itemsService
            .find({})
            .then((e) => {
                //  console.log(e); this.setState({item: e.data}) console.log(this.state) Splash
                let ls = document.querySelector('.loading-screen')
                ls
                    .classList
                    .add('loading-screen-done-hide');
                setTimeout(() => {
                    // console.log(ls);

                    ls
                        .classList
                        .add('loading-screen-done-hide');
                }, 300);
            });

    }

    renderCardList() {
        return (
            <div
                style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {this
                    .state
                    .messages
                    .map((result) => (<ItemCard key={result._id} data={result}/>))}
            </div>
        )
    }

    renderTabOverview() {
        return (
            <div>
                {this
                    .state
                    .messages
                    .map((item) => (<PlayCard key={item._id} data={item}/>))}
            </div>
        );
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }
    static PropTypes = {
        children: React.PropTypes.node,
        location: React.PropTypes.object,
        width: React.PropTypes.number.isRequired
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0
            },

            content: {
                paddingTop: 64

            },

            a: {
                color: darkWhite
            },

            iconButton: {
                color: darkWhite
            }
        }

        return styles
    }

    handleTouchTapLeftIconButton = () => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }
    handleChangeRequestNavDrawer(open) {
        this.setState({navDrawerOpen: open});
    }

    handleChangeList(event, value) {
        this
            .context
            .router
            .push(value);
        this.setState({navDrawerOpen: false});
    }

    render() {
        // const ACTIVE = {     color: 'red' }

        const {location, children} = this.props;

        let {navDrawerOpen} = this.state;

        // const {prepareStyles} = this.state.muiTheme; const router =
        // this.context.router;
        const styles = this.getStyles();

        let docked = false;
        let showMenuIconButton = true;
        // if (this.props.width === LARGE && title !=='') {   docked = true;
        // navDrawerOpen = true;   showMenuIconButton = false; styles.navDrawer = {
        // zIndex: styles.appBar.zIndex - 1,   };styles.root.paddingLeft = 256;
        // styles.footer.paddingLeft = 256; }

        return (
            <MuiThemeProvider >

                <div className={'splash-app'}>

                    <AppBar
                        onLeftIconButtonTouchTap={this
                        .handleTouchTapLeftIconButton
                        .bind(this)}
                        title={'New App'}
                        zDepth={1}
                        iconElementRight={< div />}
                        style={styles.appBar}
                        showMenuIconButton={showMenuIconButton}/>

                    <AppNavDrawer
                        style={styles.navDrawer}
                        location={location}
                        docked={docked}
                        onRequestChangeNavDrawer={this
                        .handleChangeRequestNavDrawer
                        .bind(this)}
                        onChangeList={this
                        .handleChangeList
                        .bind(this)}
                        open={navDrawerOpen}/>
                    <FullWidthSection style={styles.content}>
                        {children}
                    </FullWidthSection>

                </div>
            </MuiThemeProvider>
        );
    }
}

App.PropTypes = {
    // history: React.React.PropTypes.object.isRequired, store:
    // React.React.PropTypes.object.isRequired,
    items: React.PropTypes.array
};
App.defaultProps = {
    items: []
};

export default App;

//muiTheme={getMuiTheme(darkBaseTheme)}
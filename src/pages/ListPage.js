import React from 'react';

const feathers = require('feathers/client');
import socketio from 'feathers-socketio/client';
const rx = require('feathers-reactive');
const RxJS = require('rxjs');


import {Link} from 'react-router'

const styles = {
    root: {
        display: 'flex'
    },
    userAppBar: {
        position: 'fixed',
        // Needed to overlap the examples zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        color: 'black',
        zIndex: 1
    },

    gridWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    gridList: {
        margin: 0,
        //paddingLeft: 12,
        //paddingRight: 12,
        paddingTop: 28
    },

    tileLink: {
        display: 'block',
        padding: 2,
        textDecoration: 'none',
        color: 'inherit'
    },
    tile: {
        marginBottom: 4,
        padding: 0
    },
    headerText: {
        padding: 0
    },
    cardSubtitle: {
        paddingLeft: 8,
        fontSize: 12,
        color: 'darkgrey',
        textAlign: 'right'
    },
    addButton: {
        position: 'absolute',
        right: 40,
        bottom: 36,
        zIndex: 999
    },
    appBarToggle: {
        marginTop: 14
    }
};

import {GridList, GridTile} from 'material-ui/GridList';

window.listPage = {
    lastListName: ''
}
class ListPage extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            itemsArray: [],
            gridCols: 2,
            title: ''
        }
    }

    componentWillUpdate(e) {

        let params = e.params
        if (params.listName !== window.listPage.lastListName) {
            //window.listPage.lastListName = params.listName
            //this.loadItems(window.listPage.lastListName);
            //console.log(window.listPage.lastListName);
        }

        //
        //
        // if (params['listName']) {
        //
        // } else {
        //   console.log('load with params');
        //   let listName = params['listName']
        //   this.loadItems(listName);
        //   console.log('load all items');
        //   this.loadAllItems();
        // }

    }

    componentDidMount() {
        // setInterval(this.loadItems, this.props.pollInterval);

    }
    componentWillUnmount() {

    }

    handleResize(e) {

    }

    loadItems(listName) {

        const app = feathers()

        // Set up socket.io
        const socket = window.io
            ? window.io('http://localhost:9901')
            : false;
        if (socket) {
            app.configure(socketio(socket))
        }

        app.configure(rx(RxJS))

        // // Register hooks module app.configure(feathers.hooks()); // Register
        // socket.io
        //
        // // Set up authentication with a store to cache your auth token
        // app.configure(feathers.authentication({     storage: window.localStorage }));

        const listService = app.service('list');

        listService.on('created', function(item) {
            console.log('Someone created a item', item);
        });

        listService.find({'name': listName}).then((e) => {
            console.log(e);
            this.setState({title: listName});
            //console.log(this.state)
            this.setState({itemsArray: e.data});
        }).catch((e) => {
            console.log(e);
        });

    }

    loadAllItems() {

        const app = feathers()

        // Set up socket.io
        const socket = window.io
            ? window.io('http://localhost:9901')
            : false;
        if (socket) {
            app.configure(socketio(socket))
        }

        app.configure(rx(RxJS))

        // // Register hooks module app.configure(feathers.hooks()); // Register
        // socket.io
        //
        // // Set up authentication with a store to cache your auth token
        // app.configure(feathers.authentication({     storage: window.localStorage }));

        const itemsService = app.service('items');

        itemsService.on('created', function(item) {
            console.log('Someone created a item', item);
        });

        itemsService.find({}).then((e) => {
            // console.log(e);
            this.setState({item: e.data});
            //console.log(this.state)
            this.setState({itemsArray: e.data});
        }).catch((e) => {
            console.log(e);
        });

    }

    handleTouchTapLeftIconButton = () => {
        // nav back
    }

    render() {

        
        return (

                <div style={styles.root}>



                    <div id='GridWrapper' style={styles.gridWrapper}></div>

                </div>

        );
    }
}

export default ListPage;

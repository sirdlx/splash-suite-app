import React from 'react';

//import classNames from 'classnames';

const feathers = require('feathers/client');
import socketio from 'feathers-socketio/client';
const rx = require('feathers-reactive');
const RxJS = require('rxjs');

//import ItemCard from '../views/itemCard2';
import {
    //Card,
    //CardActions,
    CardHeader,
    CardMedia,
    //CardTitle,
    //CardText
} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';

import {Link} from 'react-router'
// import {FABButton, Icon} from 'react-mdl'; import {     Grid,     Cell,
// Button,     IconButton,     Icon,     Card,  CardText,     CardActions, Menu,
//     MenuItem } from 'react-mdl'; import {getColorClass, getTextColorClass}
// from '../util'; import {Link} from 'react-router'
// {this.renderActiveTabContent()}

import AppBar from '../../../views/AppBar';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, yellow600} from 'material-ui/styles/colors';

const styles = {
    root: {
        display: 'flex'
    },
    userAppBar: {
        position: 'fixed',
        // Needed to overlap the examples zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        backgroundColor: blue500,
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
        if (params.listName != window.listPage.lastListName) {
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
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    handleResize(e) {

        let grid = document.getElementById('GridWrapper');
        let width = grid.offsetWidth;
        let cols = 2;
        if (width < 426) {
            this.setState({gridCols: cols});
            //console.log('small')
            return;
        }

        if (width < 769) {
            cols = 3;
            this.setState({gridCols: cols});
            //console.log('med')
            return;
        }

        if (width < 1024) {
            cols = 4;
            this.setState({gridCols: cols});
            //console.log('large')
            return;
        }

        if (width < 1625) {
            cols = 5;
            this.setState({gridCols: cols});
            //console.log('xlarge')
            return;
        }

        if (width < 2125) {
            cols = 6;
            this.setState({gridCols: cols});
            //console.log('xxlarge')
            return;
        }

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

        let renderLoggedinMenu = function() {
            return (
                <IconMenu iconButtonElement={< IconButton > <MoreVertIcon/> < /IconButton>} targetOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }} anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }} style={styles.appBarIconButton}>
                    <MenuItem primaryText="Refresh"/>
                    <MenuItem primaryText="Help"/>
                    <MenuItem primaryText="Sign out"/>
                </IconMenu>
            )
        }

        let renderLoginButton = function() {
            return (<FlatButton label="Login" style={styles.appBarButton}/>);
        }

        let renderBackButton = function() {
            return (
                <IconButton ></IconButton>
            );
        }

        let renderSearchButton = function() {
            return (
                <IconButton></IconButton>
            );
        }

        let renderSearchBar = function() {
            return (

                <div>
                    <IconButton></IconButton>
                </div>
            );
        }

        return (
            <MuiThemeProvider>
                <div style={styles.root}>

                    <AppBar onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton.bind(this)} title={this.state.title} zDepth={1} style={styles.userAppBar} iconElementRight={< Toggle label = "Logged" defaultToggled = {
                        true
                    }
                    onToggle = {
                        this.handleChange
                    }
                    labelPosition = "right" style = {
                        styles.appBarToggle
                    } />}>
                        {this.state.showSearch
                            ? renderSearchBar()
                            : renderSearchButton()}
                        {this.state.logged
                            ? renderLoggedinMenu()
                            : renderLoginButton()}
                    </AppBar>

                    <div id='GridWrapper' style={styles.gridWrapper}></div>
                    <GridList cols={this.state.gridCols} padding={16} style={styles.gridList}>
                        {this.state.itemsArray.map((item) => (
                            <GridTile actionPosition="left" titlePosition="top" cols={item.featured
                                ? 2
                                : 1} rows={item.featured
                                ? 2
                                : 1} style={styles.tile} key={item._id}>
                                <Link to={'i/' + item._id} key={item._id} style={styles.tileLink}>
                                    <CardMedia>
                                        <img alt="" src={item.image}/>
                                    </CardMedia>

                                    <CardHeader title={item.title} subtitle={item.price} textStyle={styles.headerText}/>

                                    <div></div>

                                </Link>
                            </GridTile>

                        ))}
                    </GridList>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default ListPage;

// <div style = {{                 display: 'flex',                 flexWrap:
// 'wrap'             }} > {     this         .state         .itemsArray
// .map((item) => (<ItemCard key={item.id} data={item}/ >)) } < /div>
// <CardActions > <FlatButton label="Action1"/> < FlatButton label = "Action2"
// /> </CardActions> <CardHeader title = "URL Avatar" subtitle = { item.price }
// avatar = "images/jsa-128.jpg" />

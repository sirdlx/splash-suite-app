import React from 'react';

//import classNames from 'classnames';

const feathers = require('feathers/client');
import socketio from 'feathers-socketio/client';
const rx = require('feathers-reactive');
const RxJS = require('rxjs');

//import ItemCard from '../views/itemCard2';
import {
    //Card, CardActions,
    CardHeader,
    CardMedia,
    //CardTitle, CardText
} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';

import {Link} from 'react-router'
// import {FABButton, Icon} from 'react-mdl'; import {     Grid,     Cell,
// Button,     IconButton,     Icon,     Card,  CardText,     CardActions, Menu,
//     MenuItem } from 'react-mdl'; import {getColorClass, getTextColorClass}
// from '../util'; import {Link} from 'react-router'
// {this.renderActiveTabContent()}
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        margin: 0,
        //paddingLeft: 12, paddingRight: 12,
        paddingTop: 28
    },

    tileLink: {
        display: 'block',
        padding: 2,
        textDecoration: 'none',
        color: 'inherit'
    },
    tile: {
        marginBottom: 16,
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

    }
};

import {GridList, GridTile} from 'material-ui/GridList';

class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            itemsArray: [],
            gridCols: 2
        }

    }

    componentDidMount() {
        this.loadItems();
        // setInterval(this.loadItems, this.props.pollInterval);
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
        console.log(this.props.params);
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

    loadItems() {

        const socket = window.io('http://localhost:9901');
        const app = feathers()
        // Set up socket.io
            .configure(socketio(socket)).configure(rx(RxJS))

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
            this.setState({item: e.data})
            //console.log(this.state)
            this.setState({itemsArray: e.data});
        });

    }

    render() {
        return (
            <MuiThemeProvider>

                <div style={styles.root} id='GridWrapper'>

                    <GridList cols={this.state.gridCols} padding={16} style={styles.gridList}>

                        <GridTile actionPosition="left" titlePosition="top" style={styles.tile}>
                            <Link to={'/item/'} style={styles.tileLink}>
                                <CardMedia>
                                    <img alt="" src={'imageurl'}/>
                                </CardMedia>

                                <CardHeader title={'title'} subtitle={'item.price'} textStyle={styles.headerText}/>

                                <div></div>

                            </Link>
                        </GridTile>

                    </GridList>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default ItemPage;

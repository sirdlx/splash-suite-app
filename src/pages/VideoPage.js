import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import classNames from 'classnames';

const feathers = require('feathers/client');
import socketio from 'feathers-socketio/client';
const rx = require('feathers-reactive');
const RxJS = require('rxjs');

import VideoPlayer from '../views/VideoPlayer';

const styles = {
    gridWrapper: {
        padding: 0
    },
    gridList: {
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
        //paddingLeft: 12, paddingRight: 12,
        // paddingTop: 28
    },

    title: {
        display: 'block',
        padding: 0,
        textDecoration: 'none',
        color: 'inherit',
        margin: 0
    },

    cardMedia: {
        marginBottom: 16
    }

};

class VideoPage extends React.Component {
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
        //console.log(this);
        // setInterval(this.loadItems, this.props.pollInterval);
        // this.handleResize();
        // window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleResize.bind(this));
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

                <div style={styles.gridWrapper} id='GridWrapper'>

                    <GridList cols={1} padding={16}>

                        <GridTile actionPosition="left" titlePosition="top" cols={1} actionIcon={< IconButton >+< /IconButton>} style={styles.gridTile}>

                            <CardMedia style={styles.cardMedia}>
                                <VideoPlayer ytId={this.state.ytId}></VideoPlayer>
                            </CardMedia>

                            <ListItem disabled={true} primaryText="CTE thaWorld" leftAvatar={< Avatar src = {
                                'https://yt3.ggpht.com/-s0TJUkVjMK8/AAAAAAAAAAI/AAAAAAAAAAA/nuO0_s-cCb8/s88-c-k-no-mo-rj-c0xffffff/photo.jpg'
                            } />} rightIcon={< ActionInfo />} secondaryText="Jan 20, 2014"/>

                        </GridTile>

                    </GridList>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default VideoPage;

// <img alt="" src={'http://i3.ytimg.com/vi/vvyecGBM3Yw/hqdefault.jpg'}/>
//<CardHeader title={'title'} subtitle={'item.price'} textStyle={styles.headerText}/>

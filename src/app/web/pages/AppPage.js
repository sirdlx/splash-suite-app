import React from 'react';

//import {getColorClass, getTextColorClass} from '../../util';
import AppNavDrawer from '../../../views/AppNavDrawer';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import FullWidthSection from '../../../views/FullWidthSection';
// import AppFooter from './footer'; import {Link} from 'react-router'; import
// classNames from 'classnames'; import darkBaseTheme from
// 'material-ui/styles/baseThemes/darkBaseTheme';

import {
    darkWhite,
    //lightWhite,
    //grey900
} from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Toggle from 'material-ui/Toggle';

class AppPage extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            navDrawerOpen: false,
            logged: true,
            showSearch: false
        }
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
            root: {},
            userAppBar: {
                position: 'fixed',
                // Needed to overlap the examples zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
                backgroundColor: 'rgba(249, 249, 249, 0.56)',
                color: 'black',
                zIndex: 1
            },

            adminAppBar: {
                position: 'fixed',
                // Needed to overlap the examples zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 64,
                backgroundColor: 'black',
                color: 'black'
            },

            content: {
                //paddingTop: 64
            },

            a: {
                color: darkWhite
            },

            iconButton: {
                color: darkWhite
            },

            appBarIconButton: {
                margin: '8px 8px 0px -16px',
                height: 48,
                width: 48
            },

            appBarButton: {
                margin: '14px 8px 0px -16px'
            },

            appBarToggle: {
                marginTop: 14
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
        this.context.router.push(value);
        this.setState({navDrawerOpen: false});
    }

    handleChange = (event, logged) => {
        this.setState({logged: logged});
    };

    componentDidMount() {
        // setInterval(this.loadItems, this.props.pollInterval);
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    handleResize(e) {
        let thisNode = document.getElementById('root');
        let width = thisNode.offsetWidth;
        if (width < 426) {
            this.setState({size: 'small', level: 0});
            // console.log('small')
            return;
        }

        if (width < 769) {

            this.setState({size: 'med', level: 1});
            // console.log('med')
            return;
        }

        if (width < 1024) {

            this.setState({size: 'large', level: 2});
            // console.log('large')
            return;
        }

        if (width < 1625) {

            this.setState({size: 'xlarge', level: 3});
            // console.log('xlarge')
            return;
        }

        if (width < 2125) {

            this.setState({size: 'xxlarge', level: 4});
            // console.log('xxlarge')
            return;
        }

    }

    render() {

        // const ACTIVE = {     color: 'red' }

        const {location, children} = this.props;

        let {navDrawerOpen, showSearch} = this.state;

        // const {prepareStyles} = this.state.muiTheme; const router =
        // this.context.router;

        const styles = this.getStyles();

        let docked = true;
        let showMenuIconButton = true;
        if (this.state.level > 0) {
            docked = true;
            navDrawerOpen = true;
            showMenuIconButton = false;
            styles.navDrawer = {
                zIndex: styles.userAppBar.zIndex - 1
            };
            styles.root.paddingLeft = 256;
        }

        // console.log(this.context.router.isActive('/', true));
        let showBackButton = this.context.router.isActive('/', true);

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
            <MuiThemeProvider >
                <div className={'splash-app'} style={styles.root}>

                    <AppNavDrawer style={styles.navDrawer} location={location} docked={docked} onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} onChangeList={this.handleChangeList.bind(this)} open={navDrawerOpen}/>
                    <FullWidthSection style={styles.content}>
                        {children}
                    </FullWidthSection>

                </div>
            </MuiThemeProvider>
        );
    }
}

AppPage.PropTypes = {
    // history: React.React.PropTypes.object.isRequired, store:
    // React.React.PropTypes.object.isRequired,
    items: React.PropTypes.array
};
AppPage.defaultProps = {
    items: []
};

export default AppPage;

//muiTheme={getMuiTheme(darkBaseTheme)}

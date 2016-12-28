import React from 'react';
const splash = require('splash');
import {Menu, Input, Icon} from 'semantic-ui-react'

import {
    darkWhite,
    //lightWhite,
    //grey900
} from 'material-ui/styles/colors';

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
        //muiTheme: React.PropTypes.object
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
            menu: {
                //backgroundColor: 'rgba(249, 249, 249, 1)',
                //color: 'black',
                border: 'none',
                borderRadius: 0
            },

            logoIcon: {
                margin:0,
                color: 'rgb(33, 150, 243)'
            },

            content: {
                boxSizing: 'content-box',
                margin: 0,
                padding: 16,
                paddingTop: 64
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
        //this.handleResize();
        //window.addEventListener('resize', this.handleResize.bind(this));
        splash.hide();
    }
    componentWillUnmount() {
        //window.removeEventListener('resize', this.handleResize.bind(this));
    }

    handleResize(e) {}

    renderMenu() {
        const {activeItem} = this.state
        const styles = this.getStyles();

        return (
            <Menu stackable style={styles.menu} className={'top fixed'}>
                <Menu.Item as='a'>
                     <Icon name='fire' size='big' style={styles.logoIcon} />
                </Menu.Item>

                <Menu.Item name='features' active={activeItem === 'features'} onClick={this.handleItemClick}>
                    Features
                </Menu.Item>

                <Menu.Item name='testimonials' active={activeItem === 'testimonials'} onClick={this.handleItemClick}>
                    Testimonials
                </Menu.Item>

                <Menu.Item>
                    <Input className='icon' icon='search' placeholder='Search...'/>
                </Menu.Item>

                <Menu.Item name='sign-in' position='right' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
                    Sign-in
                </Menu.Item>
            </Menu>
        )
    }

    render() {

        // const ACTIVE = {     color: 'red' }

        const {
            //location,
            children
        } = this.props;

        let {navDrawerOpen, showSearch} = this.state;

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

        return (

            <div className={'splash-app'} style={styles.root}>

                {this.renderMenu()}

                <div style={styles.content}>
                    {children}
                </div>

            </div>

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

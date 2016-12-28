import React, {Component, PropTypes} from 'react';
//import {ActionDashboard, CommunicationChat, ActionInfo} from 'material-ui/svg-icons';

const SelectableList = makeSelectable(List);

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        cackgroundColor: blue500,
        marginBottom: 8
    },
    version: {
        fontSize: 16
    },

    addListButton: {
        position: 'absolute',
        right: 16,
        top: 6,
        color: 'white',
        backgroundColor: 'green',
        minWidth: 48,
        height: 48
    }
};

class AppNavDrawer extends Component {
    static propTypes = {

    };

    static contextTypes = {
        //muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };

    state = {
        muiVersions: []
    };

    componentDidMount() {}


    handleRequestChangeLink = (event, value) => {
        window.location = value;
    };

    handleTouchTapHeader = () => {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    };

    render() {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style
        } = this.props;

        let TopNav = [
            {
                id: 0,
                title: 'Dashboard',
                //status: 'Disabled',
                icon: < ActionDashboard />,
                iconBGColor: yellow600,
                link: '/dashboard'
            }, {
                id: 1,
                title: 'YT: Trap Or Die Tre',
                //status: 'Disabled',
                icon: <img src='/data/images/YouTube_light_color_icon.png'/>,
                iconBGColor: red500,
                link: '/yt/vvyecGBM3Yw'
            }, {
                id: 2,
                title: 'Messages',
                //status: 'Disabled',
                icon: < CommunicationChat />,
                iconBGColor: cyan500,
                link: '/dashboard'
            }
        ]

        let plugins = [
            {
                id: 0,
                title: 'Shop',
                status: 'Disabled',
                icon: < ActionDashboard />,
                iconBGColor: '#455a64'
            }, {
                id: 1,
                title: 'Shop',
                status: 'Disabled',
                icon: < ActionDashboard />,
                iconBGColor: blue500
            }
        ]

        let admin = true

        return (
            <div>
                <div style={styles.logo} onClick={this.handleTouchTapHeader}>
                    App Header
                </div>

            </div>
        );
    }
}

export default AppNavDrawer;

// <List value="" onChange={onChangeList}>
//
//     {TopNav.map(function(nav) {
//         return <ListItem key={nav.id} primaryText={nav.title} value={nav.link} leftAvatar={< Avatar icon = {
//             nav.icon
//         }
//         backgroundColor = {
//             nav.iconBGColor
//         } />} rightIcon={< ActionInfo />} secondaryText={nav.status}/>
//     })}
//
//     <Subheader style={styles.listSubheader}>Plugins</Subheader>
//
//     {plugins.map(function(plugin) {
//         return <ListItem key={plugin.id} primaryText={plugin.title} value={plugin.link} leftAvatar={< Avatar icon = {
//             plugin.icon
//         }
//         backgroundColor = {
//             plugin.iconBGColor
//         } />} rightIcon={< ActionInfo />} secondaryText={plugin.status}/>
//     })
// }
//
//
//     <Subheader>Settings</Subheader>
//       {admin === true &&
//         <ListItem primaryText="logout" value="/logout"/>
//       }
//
//       {admin != true &&
//       <ListItem primaryText="login" value="/account"/>
//       }
//
// </List>

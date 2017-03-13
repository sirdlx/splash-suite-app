import React from 'react';

import {
    Card,
    Icon,
    Image,
    Grid,
    wrap,
    Header
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class IndexPage extends React.Component {

    getStyles() {
        return {

            root: {
                // marginTop: 16,
                //padding: 16,
                color: 'white',
                //height: 'calc(100vh - 32px)'
            },

            textBox: {
                margin: 0,
                fontSize: 36,
                color: 'black'
            },
            section: {
                marginBottom: 16
            },

            itemGrid: {
                margin: 0,
                marginBottom: 16
            }

        }
    }

    render() {
        let styles = this.getStyles();
        const colors = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black'
        ];
        return (
            <Grid columns={1}>

                <Header as='h2'>
                    <Image src='http://semantic-ui.com/images/avatar2/large/patrick.png'/>
                    Splash
                </Header>

                <Grid columns={5}  doubling padded style={styles.section}>
                    {colors.map(color => (
                        <Grid.Column color={color} key={color}>
                            {color}
                        </Grid.Column>
                    ))}
                </Grid>

                <Grid doubling padded columns={8} style={styles.itemGrid}>
                    {colors.map(color => (
                        <Grid.Column key={color}>
                            <div className="ui card">
                                <a className="image" href="#linkFromImage">
                                    <img src="http://semantic-ui.com/images/avatar/large/steve.jpg"/>
                                </a>
                                <div className="content">
                                    <a className="header" href="#linkFromHeader">Steve Jobes</a>
                                    <div className="meta">
                                        <a className="time" href="#linkFromRecent">Last Seen 2 days ago</a>
                                    </div>
                                </div>
                            </div>
                        </Grid.Column>
                    ))}
                </Grid>

            </Grid>
        );
    }
}

export default IndexPage;

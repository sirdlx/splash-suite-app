import React from 'react';

import {Card, Icon, Image, Grid, wrap} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class IndexPage extends React.Component {

    getStyles() {
        return {

            root: {
                //margin: 0,
                //padding: 16,
                color: 'white',
                //height: 'calc(100vh - 32px)'
            },

            textBox: {
                margin: 0,
                fontSize: 36
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
            <div style={styles.root}>
                <p style={styles.textBox}>Splash</p>

                <Grid columns={8} padded>
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

            </div>
        );
    }
}

export default IndexPage;

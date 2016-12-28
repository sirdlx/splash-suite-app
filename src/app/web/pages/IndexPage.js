import React from 'react';
import {blue500, yellow600} from 'material-ui/styles/colors';
import {spacing, typography, zIndex} from 'material-ui/styles';

class IndexPage extends React.Component {

    getStyles() {
        return {

            root: {
                backgroundColor: blue500,
                margin: 0,
                padding: 16,
                color: 'white',
                height: 'calc(100vh - 32px)'
            },

            textBox: {
                margin: 0,
                fontSize: 36,
                color: typography.textFullWhite,
                lineHeight: `${spacing.desktopKeylineIncrement}px`,
                fontWeight: typography.fontWeightLight,
                padding: spacing.desktopGutter
            }

        }
    }

    render() {
        let styles = this.getStyles();
        return (
            <div style={styles.root}>
                <p style={styles.textBox}>Splash</p>
            </div>
        );
    }
}

export default IndexPage;

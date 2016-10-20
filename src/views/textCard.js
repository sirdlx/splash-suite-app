import React from 'react';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {
    Grid,
    Cell,
    Button,
    IconButton,
    Icon,
    Card,
    CardText,
    CardActions,
    Menu,
    MenuItem
} from 'react-mdl';

export default React.createClass({

    render() {
        return (
            <Grid component="section" className="section--center" shadow={0} noSpacing>
                <Cell component={Card} col={12}>
                    <CardText>
                        <h4>Technology</h4>
                        Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu.
                        Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum
                        esse. Pariatur occaecat nisi laboris tempor laboris eiusmod qui id Lorem esse
                        commodo in. Exercitation aute dolore deserunt culpa consequat elit labore
                        incididunt elit anim.
                    </CardText>
                    <CardActions>
                        <Button href="#">Read our features</Button>
                    </CardActions>
                </Cell>
                <IconButton name="more_vert" id="btn3" ripple/>
                <Menu target="btn3" align="right" valign="bottom">
                    <MenuItem>Lorem</MenuItem>
                    <MenuItem disabled>Ipsum</MenuItem>
                    <MenuItem>Dolor</MenuItem>
                </Menu>
            </Grid>

        );
    }

});

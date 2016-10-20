import React, {PropTypes} from 'react';

import classNames from 'classnames';

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

import {getColorClass, getTextColorClass} from '../util';

const propTypes = {
    className: PropTypes.string,
    expand: PropTypes.bool
};


const PlayCard = (props) => {
    const {
        //className,
        //children,
        //expand,
        data,
        //...otherProps
    } = props;

    const headerImageStyle = {
        backgroundImage: 'url(' + data.image + ')',
        background: 'url(https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
    return (
        <Grid component="section" className="section--center" shadow={0} noSpacing>
            <Cell
                style={headerImageStyle}
                component="header"
                col={3}
                tablet={2}
                phone={4}
                className={classNames('section__play-btn', getColorClass('teal', 100), getTextColorClass('white'))}>
                <Icon name="play_circle_filled"/>
            </Cell>
            <Cell component={Card} col={9} tablet={6} phone={4}>
                <CardText>
                    <h4>{data.title}</h4>
                    Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu.
                    Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum
                    esse.
                </CardText>
                <CardActions>
                    // <Button href="#">Read our features</Button>
                </CardActions>
            </Cell>
            <IconButton name="more_vert" id="btn1" ripple/>
            <Menu target="btn1" align="right" valign="bottom">
                <MenuItem>Lorem</MenuItem>
                <MenuItem disabled>Ipsum</MenuItem>
                <MenuItem>Dolor</MenuItem>
            </Menu>
        </Grid>
    );
};

PlayCard.propTypes = propTypes;

export default PlayCard;

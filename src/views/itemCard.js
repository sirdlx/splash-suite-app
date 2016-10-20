import React, {PropTypes} from 'react';

//import classNames from 'classnames';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {
    // Grid, Cell,
    //Button,
    //IconButton,
    //Icon,
    Card,
    CardTitle,
    //CardMenu,
    CardText,
    //CardActions,
    //Menu, MenuItem
} from 'react-mdl';

//import {getColorClass, getTextColorClass} from '../util';

const propTypes = {
    className: PropTypes.string,
    expand: PropTypes.bool
};

class ItemCard extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props.item)
         this.state = {}
    }

    componentDidMount() {
        this.setState(this.props.item)
    }

    // background: 'url(' + this.props.data.image + ') center / cover'
    // {this.props.data.title}

    // <CardActions border>
    //                 <Button colored>Get Started</Button>
    //             </CardActions>
    //             <CardMenu>
    //                 <IconButton name="share"/>
    //             </CardMenu>
    render() {
        return (
            <Card shadow={0}>
                <CardTitle
                    style={{
                    color: 'black',
                    background: 'url(' + this.state.image + ') center / cover',
                    margin:'16px'
                }}></CardTitle>
                <CardText>
                    <h4>{this.state.title}</h4>
                </CardText>
                
            </Card>
        );
    }
}

ItemCard.propTypes = propTypes;

export default ItemCard;
import React, {PropTypes} from 'react';

//import classNames from 'classnames';
import {
    Card,
    CardActions,
    //CardHeader,
    //CardMedia,
    CardTitle,
    //CardText
} from 'material-ui/Card';

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
    // {this.props.data.title} <CardActions border>                 <Button
    // colored>Get Started</Button>             </CardActions> <CardMenu>
    //      <IconButton name="share"/>             </CardMenu>
    render() {
        return (

            <Card
                shadow={0}
                style={{
                width: '256px',
                height: '256px',
                 background: 'url(' + this.state.image + ') center / cover',
                margin: 'auto'
            }}>
                <CardTitle expand/>
                <CardActions
                    style={{
                    height: '52px',
                    padding: '16px',
                    background: 'rgba(0,0,0,0.2)'
                }}>
                    <span
                        style={{
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        Image.jpg
                    </span>
                </CardActions>
            </Card>

        );
    }
}

ItemCard.propTypes = propTypes;

export default ItemCard;
import React from 'react';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {
    Icon, FABButton
} from 'react-mdl';



class AddPage extends React.Component {
    render() {
        return (
            <div className="react-mdl-layout__tab-panel">
                <FABButton ripple colored accent className="mdl-shadow--4dp" id="add">
                    <Icon name="add"/>
                    <span className="visuallyhidden">Add</span>
                </FABButton>
            </div>
        );
    }
}

export default AddPage;

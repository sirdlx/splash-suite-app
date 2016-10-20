import React from 'react';

// import { Link } from 'react-router'
// import classNames from 'classnames';


class App extends React.Component {

    render() {
        console.log(this.props.children)

        return (
            <div className={'splash-app'}>
               {this.props.children || "Welcome to splash-suite"}
            </div>
        );
    }
}



export default App;

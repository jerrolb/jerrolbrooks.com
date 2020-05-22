import React from 'react';
import { connect } from 'react-redux';
import './cube.css';

class Cube extends React.Component {
    render() {
        return (
            <div id="container">
                Coming Soon
            </div>
        );
    }
}

function mapStateToProps () {
    return {};
}

function mapDispatchToProps () {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cube);

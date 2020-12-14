import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

const ErrorComponent = ({contact: {error}}) => {

    return error && (<small className="d-block my-2 text-danger text-right">{error}</small>);
}

ErrorComponent.propTypes = {
    contact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps
)(ErrorComponent);

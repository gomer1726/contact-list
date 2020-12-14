import React from 'react';
import ContactFormComponent from "./ContactFormComponent";
import {addContact} from '../../actions/contactActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { goBack } from "../../utils";

const ContactAddComponent = ({addContact, history}) => {

    const onSave = async data => {
        const status = await addContact(data);
        if (status) goBack(history);
    }

    return <ContactFormComponent onSave={onSave} history={history} action="add" />;
}

ContactAddComponent.propTypes = {
    contact: PropTypes.object.isRequired,
    addContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps,
    { addContact }
)(ContactAddComponent);

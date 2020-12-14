import React, {useEffect, useState} from 'react';
import ContactFormComponent from "./ContactFormComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateContact, getSingleContact, clearSingleContact} from '../../actions/contactActions';
import { goBack } from "../../utils";

const ContactEditComponent = ({
                                  contact: {single},
                                  match,
                                  updateContact,
                                  history,
                                  getSingleContact,
                                  clearSingleContact
                              }
) => {

    const [contactFromStore, setContactFromStore] = useState(null);

    useEffect(() => {
        if (!contactFromStore) getSingleContact(match.params.id);
        if (!contactFromStore && single) setContactFromStore(single);
    }, [single]);

    useEffect(() => {
        return () => {
            clearSingleContact();
        };
    }, []);

    const onSave = async data => {
        const status = await updateContact(data);
        if (status) goBack(history);
    }

    return <ContactFormComponent onSave={onSave} passedContact={contactFromStore} history={history} action="update"/>;
}

ContactEditComponent.propTypes = {
    contact: PropTypes.object.isRequired,
    updateContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps,
    {updateContact, getSingleContact, clearSingleContact}
)(ContactEditComponent);


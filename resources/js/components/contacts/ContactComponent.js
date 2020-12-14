import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSingleContact, clearSingleContact} from '../../actions/contactActions';
import {Link} from "react-router-dom";
import { goBack } from "../../utils";

const ContactComponent = ({contact: {single}, match, history, getSingleContact, clearSingleContact}) => {

    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        if (!contactInfo) getSingleContact(match.params.id);
        if (!contactInfo && single) setContactInfo(single);
    }, [single]);

    useEffect(() => {
        return () => {
            clearSingleContact();
        };
    }, []);

    return contactInfo && (
        <div className="col-12 mt-5 py-3 shadow-sm bg-white table-responsive">

            <div className="row p-3 p-3">
                <div className="col-2">
                    <a href="#" onClick={ () => goBack(history)}>
                        <i className="fas fa-chevron-left text-black-50"></i>
                    </a>
                </div>
                <div className="col-8 text-center">
                    Contact
                </div>
                <div className="col-2 text-right">
                    <Link to="/users/new">
                        <i className="fas fa-plus text-success"></i>
                    </Link>
                </div>
            </div>

            <table className="table table-hover mt-4">
                <tbody>
                <tr>
                    <th>First name</th>
                    <td>{contactInfo.first_name}</td>
                </tr>
                <tr>
                    <th>Last name</th>
                    <td>{contactInfo.last_name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{contactInfo.email}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{contactInfo.phone}</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>{contactInfo.gender}</td>
                </tr>
                <tr>
                    <th>Birthday</th>
                    <td>{contactInfo.birthday}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

ContactComponent.propTypes = {
    contact: PropTypes.object.isRequired,
    getSingleContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps,
    {getSingleContact, clearSingleContact}
)(ContactComponent);


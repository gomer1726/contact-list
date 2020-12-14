import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {deleteContact, getContacts} from '../../actions/contactActions';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Pagination} from 'react-laravel-paginex'

const ContactListComponent = ({contact: {contacts, pagination}, match, deleteContact, history, getContacts}) => {

    const currentPage = match.params.page ?? 1;

    useEffect(() => {
        getContacts(match.params.page ?? 1);
    }, [match.params.page]);

    const onDelete = async id => {
        if (confirm("Are you sure?")) {
            await deleteContact(id);
            history.push(`/`);
        }
    }

    const getData = data => {
        if (data.page) getContacts(data.page);
        history.push('/page/' + data.page);
    }

    return (
        <Fragment>
            <div className="col-12 mt-5 p-0 bg-white shadow-sm table-responsive-sm table-responsive-md ">
                <div className="row p-3">
                    <div className="col-2">

                    </div>
                    <div className="col-8 text-center">
                        <span className="align-middle">Contact list</span>
                    </div>
                    <div className="col-2 text-right">
                        <Link to="/users/new" className="">
                            <i className="fas fa-plus text-success"></i>
                        </Link>
                    </div>
                </div>
                <table className="table table-hover">
                    <tbody>
                    {contacts.map(contact => {
                        const genderIcon = contact.gender === "male" ? "mars" : "venus";
                        return (
                            <tr key={contact.id}>
                                <td className="td-no align-middle">
                            <span className={`contact-avatar-${contact.gender}`}>
                                {contact.full_name.substring(1, -1)}
                            </span>
                                </td>
                                <td className="align-middle">
                                    <Link to={`/users/${contact.id}?r=${currentPage}`} className="contact-full-name">
                                        <i className={`fas fa-${genderIcon}`}></i>
                                        {" " + contact.full_name}
                                    </Link>
                                    <br/>
                                    <small className="text-muted">{contact.email}</small>
                                </td>
                                <td>
                                    <Link to={`/users/${contact.id}/edit?r=${currentPage}`} className="btn btn-link">
                                        <i className="fas fa-edit text-muted"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-link text-danger" onClick={() => onDelete(contact.id)}>
                                        <i className="fas fa-trash text-muted"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
            <div className="col-12 mt-4">
                <Pagination
                    changePage={getData}
                    containerClass="pagination justify-content-center"
                    data={pagination}/>
            </div>
        </Fragment>
    );
}

ContactListComponent.propTypes = {
    contact: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact
});

export default connect(
    mapStateToProps,
    {deleteContact, getContacts}
)(ContactListComponent);

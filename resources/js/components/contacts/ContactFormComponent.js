import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from "./ErrorComponent";
import {Link} from 'react-router-dom';
import { goBack } from "../../utils";

const ContactFormComponent = ({passedContact, onSave, action, history}) => {

    const title = action === "add" ? "Add contact" : "Edit contact";
    const btnTitle = action === "add" ? "Add" : "Save";

    const [contactState, setContactState] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        gender: "male",
        birthday: ""
    });

    useEffect(() => {
        if (passedContact) {
            setContactState(passedContact);
        }
        // eslint-disable-next-line
    }, [passedContact])

    const onInputChange = e => {
        setContactState({...contactState, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        onSave(contactState);
    }

    return (
        <div className="col-12 mt-5 shadow-sm bg-white py-3">
            <div className="row p-3">
                <div className="col-2">
                    <a href="#" onClick={ () => goBack(history) }>
                        <i className="fas fa-chevron-left text-black-50"></i>
                    </a>
                </div>
                <div className="col-8 text-center">
                    {title}
                </div>
                <div className="col-2 text-right">
                    <Link to="/users/new">
                        <i className="fas fa-plus text-success"></i>
                    </Link>
                </div>
            </div>

            <hr/>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name_input" className="form-label">First name</label>
                    <input type="text"
                           className="form-control form-control-sm"
                           id="first_name_input"
                           name="first_name"
                           onChange={onInputChange}
                           value={contactState.first_name}
                           required
                           placeholder={"Contact first name"}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name_input" className="form-label">Last name</label>
                    <input type="text"
                           className="form-control form-control-sm"
                           id="last_name_input"
                           name="last_name"
                           onChange={onInputChange}
                           value={contactState.last_name}
                           required
                           placeholder={"Contact last name"}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone_input" className="form-label">Phone</label>
                    <input type="text"
                           className="form-control form-control-sm"
                           id="phone_input"
                           name="phone"
                           onChange={onInputChange}
                           value={contactState.phone}
                           required
                           placeholder={"Contact phone"}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email_input" className="form-label">Email address</label>
                    <input type="email"
                           className="form-control form-control-sm"
                           id="email_input"
                           name="email"
                           onChange={onInputChange}
                           value={contactState.email}
                           required
                           placeholder={"Enter email"}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthday_input" className="form-label">Birthday</label>
                    <input type="date"
                           className="form-control form-control-sm"
                           id="birthday_input"
                           name="birthday"
                           onChange={onInputChange}
                           value={contactState.birthday}
                           required
                    />
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="radio"
                           id="gender_input_option_1"
                           name="gender"
                           onChange={onInputChange}
                           value="male"
                           checked={contactState.gender === 'male'}
                    />
                    <label className="form-check-label" htmlFor="gender_input_option_1">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input"
                           type="radio"
                           id="gender_input_option_2"
                           name="gender"
                           onChange={onInputChange}
                           value="female"
                           checked={contactState.gender === 'female'}
                    />
                    <label className="form-check-label" htmlFor="gender_input_option_2">
                        Female
                    </label>
                </div>
                <ErrorComponent/>
                <button type="submit" className="btn btn-primary btn-sm mt-3 float-right">{btnTitle}</button>
                <div className="clearfix"></div>
            </form>
        </div>
    );
}

ContactFormComponent.propTypes = {
    passedContact: PropTypes.object,
    onSave: PropTypes.func
};

export default ContactFormComponent;

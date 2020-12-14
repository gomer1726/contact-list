import {
    GET_CONTACTS,
    SET_ERROR,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_PAGINATION,
    GET_SINGLE_CONTACT,
    CLEAR_SINGLE_CONTACT
} from './types';
import axios from 'axios';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

// Get contacts from server
export const getContacts = page => async dispatch => {
    try {
        const res = await axios.get(`/api/contacts?page=${page ?? null}`);

        dispatch({
            type: GET_CONTACTS,
            payload: res.data.data
        });
        dispatch({
            type: SET_PAGINATION,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SET_ERROR,
            payload: err.response.data.message
        });
    }
};

// Add new log
export const addContact = contact => async dispatch => {
    try {
        const res = await axios.post('/api/contacts', {
            ...contact
        }, { headers: DEFAULT_HEADERS });

        dispatch({
            type: ADD_CONTACT,
            payload: res.data.data
        });
        return true;
    } catch (err) {
        dispatchError(err.response.data.message ?? null, dispatch);
        return false;
    }
};

// Delete contact from server
export const deleteContact = id => async dispatch => {
    try {
        await axios.delete(`/api/contacts/${id}`);

        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
        return true;
    } catch (err) {
        dispatchError(err.response.data.message ?? null, dispatch);
        return false;
    }
};

// Update contact on server
export const updateContact = contact => async dispatch => {
    try {
        const res = await axios.put(`/api/contacts/${contact.id}`, {
            ...contact
        }, { headers: DEFAULT_HEADERS });

        dispatch({
            type: UPDATE_CONTACT,
            payload: res.data.data
        });
        return true;
    } catch (err) {
        dispatchError(err.response.data.message ?? null, dispatch);
        return false;
    }
};

export const getSingleContact = id => async dispatch => {
    try {
        const res = await axios.get(`/api/contacts/${id}`);

        dispatch({
            type: GET_SINGLE_CONTACT,
            payload: res.data.data
        });
        return true;
    } catch (err) {
        dispatchError(err.response.data.message ?? null, dispatch);
        return false;
    }
}

// Clear current log
export const clearSingleContact = () => {
    return {
        type: CLEAR_SINGLE_CONTACT
    };
};

//----------------------------

const dispatchError = (error, dispatch) => {
    dispatch({
        type: SET_ERROR,
        payload: error
    });
    setTimeout(() => dispatch({type: SET_ERROR, payload: null}), 3000);
}

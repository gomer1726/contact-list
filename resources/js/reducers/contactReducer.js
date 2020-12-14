import {
    GET_CONTACTS,
    SET_ERROR,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    SET_PAGINATION,
    GET_SINGLE_CONTACT,
    CLEAR_SINGLE_CONTACT
} from '../actions/types';

const initialState = {
    contacts: [],
    loading: false,
    error: null,
    pagination: [],
    single: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case GET_SINGLE_CONTACT:
            return {
                ...state,
                single: action.payload
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                )
            };
        case CLEAR_SINGLE_CONTACT:
            return {
                ...state,
                single: null
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload
            };
        default:
            return state;
    }
};

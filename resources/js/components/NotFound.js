import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="col-12 mt-5 shadow-sm bg-white py-3 text-center">
            <h1>Page not found</h1>
            <Link to="/">Go home</Link>
        </div>
    );
}

export default NotFound;

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ContactListComponent from './contacts/ContactListComponent';
import NotFound from './NotFound';
import {Provider} from 'react-redux';
import store from '../store';
import ContactAddComponent from "./contacts/ContactAddComponent";
import ContactEditComponent from "./contacts/ContactEditComponent";
import ContactComponent from "./contacts/ContactComponent";

const MainComponent = () => {

    return (
        <Provider store={store}>
            <Router>
                <div className="row justify-content-md-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-4">
                        <Switch>
                            <Route exact path="/" component={ContactListComponent}/>
                            <Route exact path="/page/:page" component={ContactListComponent}/>
                            <Route exact path="/users/new" component={ContactAddComponent}/>
                            <Route exact path="/users/:id" component={ContactComponent}/>
                            <Route exact path="/users/:id/edit" component={ContactEditComponent}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default MainComponent;

if (document.getElementById('main')) {
    ReactDOM.render(<MainComponent/>, document.getElementById('main'));
}

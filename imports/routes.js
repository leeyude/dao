import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Header from './components/header/Header';
import Homepage from './components/pages/homepage/Homepage';
import Admin from './components/admin/Admin';
import UploadDistrict from './components/admin/uploads/uploadDistrict';

export default Routes = class Routes extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={() => (<Header/>)}/>
          <Route exact path="/login" component={() => (<Header accountAction="login"/>)}/>
          <Route exact path="/signup" component={() => (<Header accountAction="signup"/>)}/>

          <Route exact path="/admin" component={() => (<Admin/>)}/>
          <Route exact path="/upload_district" component={() => (<UploadDistrict/>)}/>
        </div>
      </Router>
    )
  }
};

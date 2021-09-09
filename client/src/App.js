import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/ui/navbar/navbar.js";
import HomePage from "./components/pages/homePage/homePage.js"
import DeviceDetail from "./components/pages/detailPage/deviceDetail.js";

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

import "./App.css"


class App extends Component {
  constructor() {
    super();
    this.state = {
      disableScroll: false
    };
    window.addEventListener('device-edit', this._manageScroll.bind(this));
    window.addEventListener('close-modal', this._manageScroll.bind(this));
  }

  _manageScroll(e) {
    this.setState({disableScroll: e.detail.modalState})
    e.stopPropagation()
  }


  render() {
    return (
      <div className={this.state.disableScroll ? 'App hide-scroll' : 'App'}>
      <Router>
        <Navbar
          goBack={this.state.goBack}
        />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route
            path="/details/:id"
            render={ match => <DeviceDetail setUser={this.setTheUser} {...match} />}
          />
          {/* <Route exact path="/" component={Home} />
          <Route
            path="/details/:id"
            render={() => <DeviceDetail setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/login"
            render={match => <Login setUser={this.setTheUser} {...match} />}
          />
        
          <Route
            exact path="/profile"
            render={() => <Profile loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>}
          />

          <Route
            exact path="/myPets"
            render={() => <MyPets loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />
          <Route path="/petDetails/:id" component={petDetails} />
          <Route
            exact path="/myHome"
            render={() => <MyHome loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />

          <Route
            exact path="/reservationDetails/:id"
            render={match => <ReservationDetails {...match} loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />
          <Route path="/requestDetail/:id" component={RequestDetails} />

          <Route
            exact path="/reservations"
            render={() => <Reservations loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>}
          /> */}
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;

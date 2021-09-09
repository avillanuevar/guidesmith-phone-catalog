import React, { Component } from "react";
import "./navbar.scss";

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';


class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = {goBack: this.props.goBack}
     
    }
  
    render() {
      console.log(this.state.goBack);
      return  (
        <>
          <div className='navbarGS'>
            <div className='navbar-title'>
                <h2>Guide Smith</h2>
            </div>
          </div>
        </>
      );
    }}
  
  export default NavBar;
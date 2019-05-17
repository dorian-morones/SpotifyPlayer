import React, { Component } from "react";
import "./NavBar.css"

class NavBar extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center Navbar">
          <div className="col-6 align-self-center">
            <h2 className="Navbar__Title">Search your Song</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';

const Links = () => (
  <div className="row">
    <div className="offset-1 col-10 offset-sm-6 col-sm-6 offset-lg-7 col-lg-5 offset-xl-8 col-xl-4 text-center">
      <NavLink exact to="/home">
        <i className="fas fa-home mx-3 mx-md-4" />
      </NavLink>
      <Dropdown />
      <NavLink to="/instructions">
        <i className="fas fa-info-circle mx-3 mx-md-4" />
      </NavLink>
      <NavLink to="/about">
        <i className="fas fa-question-circle mx-3 mx-md-4" />
      </NavLink>
      <NavLink to="/exit" >
        <i className="fas fa-sign-out-alt mx-3 mx-md-4" />
      </NavLink>  
    </div>
  </div>
);

export default Links;
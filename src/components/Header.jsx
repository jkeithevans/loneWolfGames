import React from 'react';
import NavTabs from './NavTabs';
import './Header.css';

const Header = () => (
  <header className="container-fluid px-3 pb-3">
    <div className="row">
      <div className="col-12 col-sm-7 m-0">
        <div className="mr-3" id="wolfLogo"></div>
        <div id="nameLogo">
          <h1 className="logoText mb-0">LONE WOLF</h1>
          <h4 className="subtitleText mb-1">solitaire card games</h4>
        </div>
      </div>
    </div>
    <NavTabs />
  </header>
);

export default Header;
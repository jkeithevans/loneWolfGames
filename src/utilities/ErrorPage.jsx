import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => (
  <div id="errorPage">
  <div className="fas fa-paw iconError rightPaw"></div>
    <h1 id="msgError" className="text-center">Cannot track down this page</h1>
    <div className="fas fa-paw iconError leftPaw"></div>
    <h1 className="text-center">it's not part of Lone Wolf Games</h1>
    <Link to="/" id="btnError" >Go Back</Link>
    <div className="fas fa-paw iconError rightPaw"></div>
    <div className="fas fa-paw iconError leftPaw"></div>
  </div>
);

export default ErrorPage;
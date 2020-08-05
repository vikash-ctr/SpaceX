import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter } from "react-router-dom";
import Website from "./Website";
ReactDOM.render(
  <div>
  <BrowserRouter>
  <Website/>           
  </BrowserRouter>
    </div>

  , document.getElementById('root'));



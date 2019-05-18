import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"

import "./assets/css/nucleo-icons.css"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/scss/blk-design-system.scss"

ReactDOM.render(  <Router>
  <App />
</Router>, document.getElementById('root'));


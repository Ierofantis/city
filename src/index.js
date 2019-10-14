import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import TheButton from './TheButton';
import MainPage from './MainPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
    <div>
      <Route path='/' component={MainPage}>
    </Route>
    <Route path='/TheButton' component={TheButton}> 
    </Route>
    <Route path='/Login' component={Login}>
    </Route>
    <Route path='/Signup' component={App}>
    </Route>
    <Route path='/MainPage' component={MainPage}>
    </Route>

    </div>
  </BrowserRouter>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


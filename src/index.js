import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import TheButton from './TheButton';
import GetLocation from './GetLocation';
import Map from './Map';
import MainPage from './MainPage';
import { BrowserRouter, Route } from 'react-router-dom';



ReactDOM.render(
    <BrowserRouter>
    <div>
    <Route path='/' component={MainPage}>
    </Route>
    <Route path='/TheButton' component={TheButton}> 
    </Route>
    <Route path='/GetLocation' component={GetLocation}> 
    </Route>
    <Route path='/Map' component={Map}> 
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


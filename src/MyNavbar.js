import React from "react";
import "./App.css";
import * as jwtDecode from 'jwt-decode';
import { createBrowserHistory } from 'history'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, FormControl, Form} from 'react-bootstrap';

export default class MyNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
  }
     
    Logout(){
      this.props.fetchToggle()
          setTimeout(
            function() {
              localStorage.removeItem("token");
                localStorage.removeItem("name");

                this.props.history.push('/');
            }
            .bind(this),
            1000
        );   
      }

      goHome(){
         this.props.history.push('/TheButton');       
      }

      goMap(){
        this.props.history.push('/Map');      
     }

      goMyplaces(){
        this.props.history.push('/GetLocation');        
    }
    
  render() {
          return (
                    <Navbar  bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand onClick={() => this.goHome()}>Citizen</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.goHome()}>Home</Nav.Link>
                            <NavDropdown title="Activity" id="basic-nav-dropdown">
                              <NavDropdown.Item onClick={() => this.goMap()}>Alerts/Map</NavDropdown.Item>
                              <NavDropdown.Item onClick={() => this.goMyplaces()}>My History</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item onClick={() => this.Logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                          </Nav>
                        </Navbar.Collapse>
                      </Navbar>
                       
    );
  }
}

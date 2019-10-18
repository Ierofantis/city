import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from "arwes";
import { Form } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';
import { createBrowserHistory } from 'history'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    let auth = localStorage.getItem("token");
     if(auth){
       this.props.history.push('/TheButton');
       }
   }
    goToLogin(){
     this.props.history.push('/Login');
    }

    goToSignup(){
     this.props.history.push('/Signup');
    }

  render() {
     return (
      <div className="App">
        <ThemeProvider theme={createTheme()}>
          <Row>

            <Col s={6} m={8} l={6} offset={["m2", "l3"]}>
              <Arwes animate show>
                {anim => (
                    <React.Fragment>
                      <div style={{ padding: 20 }}>
                        <h1>Citizen</h1>
                        <p>You are not in danger</p>   
                    </div>
                         <div style={{ paddingTop: 80 }}>
                        <Button onClick={() => this.goToSignup()}>Signup</Button> or <Button onClick={() => this.goToLogin()} style={{ cursor: "pointer"}}>Login</Button>
                         </div>
                  </React.Fragment>
                )}
              </Arwes>
            </Col>
            
          </Row>
        </ThemeProvider>
      </div>
    );
  }
}

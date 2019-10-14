import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from "arwes";
import { Form } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef(); 
    this.passInput = React.createRef(); 
  }

login(){
 
let name = this.textInput.current.value;
let password = this.passInput.current.value;
let props = this.props;

fetch('http://localhost:8080/api/users/signin', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    { name: name, password: password,
   })
 }).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log('data',data.token)
  localStorage.setItem("token", data.token);  
  props.history.push('/TheButton');
 });
}

  setToken = idToken => {
    localStorage.setItem("token", idToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    if(this.getToken() !== 'undefined') {
    let answer = jwtDecode(this.getToken());
    console.log(answer)
    return answer;
    }
    else{
      console.log('no token found')
    }
  };
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
                        <p><Button onClick={() => this.goToLogin()}>Login</Button> or <Button onClick={() => this.goToSignup()}>Signup</Button></p> 
                       
                      <div class="container" style={{ paddingTop: 60 }}>
                          <div class="row">
                          <div class="col-lg-4 col-md-4 col-xs-12">
                          </div>
                            <div class="col-lg-4 col-md-4 col-xs-12">
                               <Form>
                                <Form.Group controlId="formBasicUser">
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control ref={this.textInput} type="text" type="text" placeholder="Enter user" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{ paddingTop: 20 }}>
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control ref={this.passInput} type="text" type="password" placeholder="Password" />
                                </Form.Group>
                              </Form>
                              <Button variant="primary" type="submit" onClick={() => this.login()}>
                                  Submit
                                </Button>
                          </div>
                        </div>
                      </div>
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

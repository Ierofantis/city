import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from "arwes";
import { Form } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';

export default class TheButton extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef(); 
    this.passInput = React.createRef(); 
  }

componentDidMount(){
 let auth = localStorage.getItem("token");
  if(!auth){
    this.props.history.push('/');
    }
}

postLocation(event){
    let latitude =  "40.9356525";
    let longitude = "24.4065584";
    let text = this.textInput.current.value;
    let name = "nick"
  fetch('http://localhost:8080/api/send/location', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem("token"),
    },
    body: JSON.stringify(
     { latitude:latitude, longitude:longitude, name:name, text:text
    })
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('data',data)
    localStorage.setItem("token", data.token);  
  });
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
                        <p>Make the incident public</p>
                       
                      <div class="container" style={{ paddingTop: 60 }}>
                          <div class="row">
                          <div class="col-lg-4 col-md-4 col-xs-12">
                          </div>
                            <div class="col-lg-4 col-md-4 col-xs-12">
                               <Form>
                                <Form.Group controlId="formBasicUser">
                                  <Form.Label>Write about the incident</Form.Label>
                                  <Form.Control ref={this.textInput} type="text" type="text" placeholder="i think that I am in danger..." />
                                </Form.Group>
                              </Form>
                              <Button variant="primary" type="submit" onClick={() => this.postLocation()}>
                                  Send Location
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

import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from "arwes";
import { Form } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';
import { createBrowserHistory } from 'history'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Navbar, Nav, NavDropdown, FormControl} from 'react-bootstrap';
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     locations: []
    }
  }
  componentDidMount(){
    fetch("http://localhost:8080/api/send/danger")
     .then(res => res.json())
     .then(
       (result) => {
         this.setState({ locations: result });      
       },
       (error) => {
         console.log(error);
       }
     )
 }
    goToLogin(){
     this.props.history.push('/Login');
    }

    goToSignup(){
     this.props.history.push('/Signup');
    }

    goToTheButton(){
      this.props.history.push('/TheButton');
     }

    goHome(){
    this.props.history.push('/TheButton');
    }
    
  render() {
    const { locations } = this.state;

     return (
      <div className="App">
        <ThemeProvider theme={createTheme()} className=" ar">
          <Row>

            <Col s={6} m={8} l={6} offset={["m2", "l3"]}>
              <Arwes animate show>
                {anim => (
                    <React.Fragment >
                    <div >
                      <div style={{ padding: 20 }}>
                      <Navbar  bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand onClick={() => this.goHome()}>Citizen</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.goHome()}>Home</Nav.Link>
                            <NavDropdown title="Activity" id="basic-nav-dropdown">
                              <NavDropdown.Item href="/Map">Alerts/Map</NavDropdown.Item>
                              <NavDropdown.Item>My History</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item onClick={() => this.Logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                          </Nav>
                        </Navbar.Collapse>
                      </Navbar>
                        <h1>Danger Places</h1>
                        <p>You are not in danger </p>  
                        {/* <Loader
                          type="Puff"
                          color="red"
                          height={100}
                          width={100}
                        />  */}
                    </div>
                        
                         <Col s={12} m={6} l={6} offset={['l3']}>
                        <LeafletMap
                          center={[38, 23.8]}
                          zoom={11}
                          maxZoom={20}
                          attributionControl={true}
                          zoomControl={true}
                          doubleClickZoom={true}
                          scrollWheelZoom={true}
                          dragging={true}
                          animate={true}
                          easeLinearity={0.35}
                        >
                          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                         {locations.map((location, index) => (
                          <Marker key={index} position={[location.latitude,location.longitude]}>
                            <Popup>{location.text}</Popup>
                          </Marker>
                          ))}
                        </LeafletMap>
                      </Col>
                         
                    
                         
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

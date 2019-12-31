import React from "react";
import "./App.css";
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from "arwes";
import { Form} from 'react-bootstrap';
import { geolocated } from "react-geolocated";
import Loader from 'react-loader-spinner'
import MyNavbar from './MyNavbar';

class TheButton extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef(); 
    this.passInput = React.createRef(); 
    this.state = {loading: false};
    this.user = localStorage.getItem("name");
    this.state= {
      loading:false
    }
    this.fetchToggle = this.fetchToggle.bind(this);
    this.publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  }

  fetchToggle(){
    this.setState({ loading: true })
    setTimeout(
      function() {
        this.setState({ loading: false })
      }
      .bind(this),
      1000
   );
  }

componentDidMount(){
  let auth = localStorage.getItem("token");
  this.setState({ loading: true })
  setTimeout(
    function() {
      this.setState({ loading: false })
      if(!auth){
        this.props.history.push('/');
        alert('You have to register/login first')
      }
    }
    .bind(this),
    1500
 );
}

Logout(){
  this.setState({ loading: true })
    setTimeout(
      function() {
          this.setState({loading: false});
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          this.props.history.push('/');
      }
      .bind(this),
      1000
  );   
}

// Register SW, Register Push, Send Push
async  send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  await fetch("https://danger-button-backend.herokuapp.com/api/send/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }
  });
  console.log("Push Sent...");
}

urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
postLocation(lon,lat){

    let latitude =  lat.toString();
    let longitude = lon.toString();
    let text = this.textInput.current.value;
    let name = localStorage.getItem("name");
    this.setState({ loading: true })
    setTimeout(
      function() {
          this.setState({loading: false});
      }
      .bind(this),
      1000
  );

  // Check for service worker
  if ("serviceWorker" in navigator) {
    this.send().catch(err => console.error(err));
  }  
  console.log(name) 
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  fetch('https://danger-button-backend.herokuapp.com/api/send/location', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem("token"),
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
     { latitude:latitude, longitude:longitude, name:name, text:text
    })
  }).then(function(response) {
    setTimeout(
      function() {
        if(response.status !== 200){
         alert('Sorry, an error occured, try again later');
         }
      }
      .bind(this),
      1500
  );
     
    return response.json();
  })
}

  render() {
     return (
      !this.props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="App">
        <ThemeProvider theme={createTheme()}>
          <Row>

            <Col s={6} m={8} l={6} offset={["m2", "l3"]}>
              <Arwes animate show>
                {anim => (
                    <React.Fragment>
                      {this.state.loading === false ? (
                      <div style={{ padding: 20 }}>
                      <MyNavbar {...this.props} fetchToggle={this.fetchToggle} />
                      <div style={{ paddingTop: 20 }}>
                        <h1>Welcome {this.user}</h1>
                        <p>You are not in danger</p>
                        <p>Make the incident public</p>
                       
                      <div className="container" style={{ paddingTop: 60 }}>
                          <div className="row">
                      
                          <div className="col-lg-4 col-md-4 col-xs-12">
                          </div>
                            <div className="col-lg-4 col-md-4 col-xs-12">
                               <Form>
                                <Form.Group controlId="formBasicUser">
                                  <Form.Label>Write about the incident</Form.Label>
                                  <Form.Control ref={this.textInput} type="text" type="text" placeholder="i think that I am in danger..."  maxLength="255"/>
                                </Form.Group>
                              </Form>
                              <Button variant="primary" type="submit" onClick={() => this.postLocation(this.props.coords.longitude,this.props.coords.latitude)}>
                                  Send Location
                                </Button>
                                <div style={{ paddingTop: 40 }}>
                                  <a className="links" onClick={() => this.Logout()}>Logout</a>
                                </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                      ):  
                      <div className="container" style={{ paddingTop: 190 }}>
                      <div className="row">
                      <div className="col-lg-4 col-md-4 col-xs-12">
                      </div>
                        <div className="col-lg-4 col-md-4 col-xs-12">
                        <Loader
                          type="Puff"
                          color="#00BFFF"
                          height={100}
                          width={100}
                          timeout={3000} //3 secs
                        />
                     </div>
                        </div>
                      </div>
                    }
                  </React.Fragment>
                )}
              </Arwes>
            </Col>        
          </Row>
        </ThemeProvider>
      </div>
    ):null
    );
  }
}
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(TheButton);
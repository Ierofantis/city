import React from 'react'
import './App.css'
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from 'arwes'
import { Form } from 'react-bootstrap'
import { geolocated } from 'react-geolocated'
import Loader from 'react-loader-spinner'
import MyNavbar from './MyNavbar'
import Geocode from "react-geocode";

class TheButton extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.addressInput = React.createRef();
    this.passInput = React.createRef();
    this.state = { loading: false };
    this.user = localStorage.getItem('name');
    this.state = {
      loading: false,
      showNotification: true
    };
    this.fetchToggle = this.fetchToggle.bind(this);
  }

  fetchToggle() {
    this.setState({ loading: true });
    setTimeout(
      function () {
        this.setState({ loading: false });
      }.bind(this),
      1000
    )
  }

  componentDidMount() {
    let auth = localStorage.getItem('token');

    this.setState({ loading: false });
    if (!auth) {
      this.props.history.push('/');
      alert('You have to register/login first');
    }
  }

  Logout() {
    this.setState({ loading: true });
    setTimeout(
      function () {
        this.setState({ loading: false });
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.props.history.push('/');
      }.bind(this),
      1000
    )
  }

  postAddress() {
    let address = this.addressInput.current.value;

    Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_TOKEN}`);

    // Get latitude & longitude from address.
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        let latitude = lat.toString();
        let longitude = lng.toString();
        let text = this.textInput.current.value;
        let name = localStorage.getItem('name');
        this.setState({ loading: true });

        setTimeout(
          function () {
            this.setState({ loading: false });
          }.bind(this),
          1000
        );

        fetch('http://localhost:8080/api/send/location', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            name: name,
            text: text
          })
        }).then(function (response) {
          setTimeout(
            function () {
              if (response.status !== 200) {
                alert('Sorry, an error occured, with status ' + response.status + ' and you have to write a text before the button')
              }
            }.bind(this),
            1500
          );

          //Check for service worker and status

          if (localStorage.getItem('subscribed') && response.status === 200) {
            if ('serviceWorker' in navigator) {
              fetch(
                'http://localhost:8080/api/send/subscribe',
                {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  }
                }
              );
            }
          }
          return response.json();
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  postLocation(lon, lat) {
    let latitude = lat.toString();
    let longitude = lon.toString();
    let text = this.textInput.current.value;
    let name = localStorage.getItem('name');
    this.setState({ loading: true });

    setTimeout(
      function () {
        this.setState({ loading: false });
      }.bind(this),
      1000
    );

    fetch('http://localhost:8080/api/send/location', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        name: name,
        text: text
      })
    }).then(function (response) {
      setTimeout(
        function () {
          if (response.status !== 200) {
            alert('Sorry, an error occured, with status ' + response.status + ' and you have to write a text before the button')
          }
        }.bind(this),
        1500
      );

      //Check for service worker and status

      if (localStorage.getItem('subscribed') && response.status === 200) {
        if ('serviceWorker' in navigator) {
          fetch(
            'http://localhost:8080/api/send/subscribe',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            }
          );
        }
      }
      return response.json();
    });
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className='App'>
        <ThemeProvider theme={createTheme()}>
          <Row>
            <Col s={6} m={8} l={6} offset={['m2', 'l3']}>
              <Arwes animate show>
                {anim => (
                  <React.Fragment>
                    {this.state.loading === false ? (
                      <div style={{ padding: 20 }}>
                        <MyNavbar
                          {...this.props}
                          fetchToggle={this.fetchToggle}
                        />
                        <div style={{ paddingTop: 20 }}>
                          <h1>Welcome {this.user}</h1>
                          <div>You are not in danger</div>
                          <div>Make the incident public</div>
                          <div className='container' style={{ paddingTop: 60 }}>
                            <div className='row'>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>
                                <Form>
                                  <Form.Group controlId='formBasicUser'>
                                    <Form.Label>
                                      Write about the incident
                                    </Form.Label>
                                    <Form.Control
                                      ref={this.textInput}
                                      type='text'
                                      type='text'
                                      placeholder='i think that I am in danger...'
                                      maxLength='255'
                                    />
                                  </Form.Group>
                                </Form>

                              </div>
                            </div>
                            <div className='row' style={{ marginTop: "48px" }}>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>
                                <h1>Two ways of sending Location</h1>
                              </div>
                            </div>
                            <div className='row' style={{ marginTop: "12px" }}>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>
                                The first is by clicking the button(Beta)
                              </div>
                            </div>
                            <div className='row' style={{ marginTop: "12px" }}>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>

                                <Button
                                  variant='primary'
                                  type='submit'
                                  onClick={() =>
                                    this.postLocation(
                                      this.props.coords.longitude,
                                      this.props.coords.latitude
                                    )
                                  }
                                >
                                  Send Location
                                </Button>
                              </div>
                            </div>
                            <div className='row' style={{ marginTop: "48px" }}>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>
                                The second is by writing your address
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-lg-4 col-md-4 col-xs-12'> </div>
                              <div className='col-lg-4 col-md-4 col-xs-12'>
                                <Form>
                                  <Form.Group controlId='formBasicUser'>
                                    <Form.Label>
                                      Write your address
                                    </Form.Label>
                                    <Form.Control
                                      ref={this.addressInput}
                                      type='text'
                                      type='text'
                                      placeholder='Honolulu 29'
                                      maxLength='255'
                                    />
                                  </Form.Group>
                                </Form>
                                <Button
                                  variant='primary'
                                  type='submit'
                                  onClick={() =>
                                    this.postAddress()
                                  }
                                >
                                  Send Location
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div className='container' style={{ paddingTop: 190 }}>
                          <div className='row'>
                            <div className='col-lg-4 col-md-4 col-xs-12' />
                            <div className='col-lg-4 col-md-4 col-xs-12'>
                              <Loader
                                type='Puff'
                                color='#00BFFF'
                                height={100}
                                width={100}
                                timeout={3000} //3 secs
                              />
                            </div>
                          </div>
                        </div>
                      )}
                  </React.Fragment>
                )}
              </Arwes>
            </Col>
          </Row>
        </ThemeProvider>
      </div>
    ) : null
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(TheButton)

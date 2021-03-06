import React from 'react'
import './App.css'
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from 'arwes'
import Loader from 'react-loader-spinner'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import MyNavbar from './MyNavbar'

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loading: false
    };
    this.fetchToggle = this.fetchToggle.bind(this);
  }

  fetchToggle() {
    this.setState({ loading: true });
    setTimeout(
      function () {
        this.setState({ loading: false })
      }.bind(this),
      1000
    )
  }

  componentDidMount() {
    this.setState({ loading: true });

    setTimeout(
      function () {
        this.setState({ loading: false })
      }.bind(this),
      1500
    )
    fetch('https://immense-beach-20159.herokuapp.com/api/send/danger')
      .then(res => res.json())
      .then(
        result => {
          this.setState({ locations: result })
        },
        error => {
          console.log(error)
        }
      )
  }
  goToLogin() {
    this.props.history.push('/Login');
  }

  goToSignup() {
    this.props.history.push('/Signup');
  }

  goToTheButton() {
    this.props.history.push('/TheButton');
  }

  Logout() {
    this.setState({ loading: true })
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

  render() {
    const { locations } = this.state;

    return (
      <div className='App'>
        <ThemeProvider theme={createTheme()}>
          <Row>
            <Col s={6} m={8} l={6} offset={['m2', 'l3']}>
              <Arwes animate show>
                {anim => (
                  <React.Fragment>
                    {this.state.loading === false ? (
                      <div>
                        <div style={{ padding: 20 }}>
                          <MyNavbar {...this.props} />
                          <h1>Dangerous Places</h1>
                          <div>You are not in danger </div>
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
                            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                            {locations.map((location, index) => (
                              <Marker
                                key={index}
                                position={[
                                  location.latitude,
                                  location.longitude
                                ]}
                              >
                                <Popup>{location.text}</Popup>
                              </Marker>
                            ))}
                          </LeafletMap>
                        </Col>
                      </div>
                    ) : (
                        <div className='container' style={{ paddingTop: 190 }}>
                          <div className='row'>
                            <div className='col-lg-4 col-md-4 col-xs-12'></div>
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
    )
  }
}

import React from 'react'
import './App.css'
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from 'arwes'
import { Form } from 'react-bootstrap'
import * as jwtDecode from 'jwt-decode'
import { withRouter } from 'react-router'
import Loader from 'react-loader-spinner'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.textInput = React.createRef();
    this.passInput = React.createRef();
    this.emailInput = React.createRef();
    this.state = { loading: false };
  }

  signup () {
    let name = this.textInput.current.value;
    let email = this.emailInput.current.value;
    let password = this.passInput.current.value;
    let props = this.props;

    this.setState({ loading: true });
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';

    fetch('https://immense-beach-20159.herokuapp.com/api/users', {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
      .then(function (response) {
        setTimeout(
          function () {
            if (response.status !== 200) {
              alert('Sorry, an error occured, with status '+ response.status + ' user already registered.');
            }
          }.bind(this),
          5000
        );
        props.history.push('/');
        return response.json();
      })
      .then(function (data) {
       if(data && data.token !== undefined){
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', name)
        props.history.push('/button')
        }
        else {
          props.history.push('/');
        }
      })
  }

  goToLogin () {
    this.props.history.push('/Login');
  }

  goToSignup () {
    this.props.history.push('/Signup');
  }

  setToken = idToken => {
    localStorage.setItem('token', idToken);
  }

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('token');
  }

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    if (this.getToken() !== 'undefined') {
      let answer = jwtDecode(this.getToken());
      return answer;
    } else {
      console.log('no token found');
    }
  }

  render () {
    return (
      <div className='App'>
        <ThemeProvider theme={createTheme()}>
          <Row>
            <Col s={6} m={8} l={6} offset={['m2', 'l3']}>
              <Arwes animate show>
                {anim => (
                  <React.Fragment>
                    {this.state.loading === false ? (
                      <div style={{ padding: 20 }}>
                        <h1>Citizen</h1>
                        <div>You are not in danger</div>
                        <div style={{ padding: 20 }}>
                          <a
                            className='links'
                            style={{ margin: '5px' }}
                            onClick={() => this.goToSignup()}
                          >
                            Signup
                          </a>
                          <span>or</span>
                          <a
                            className='links'
                            style={{ margin: '5px' }}
                            onClick={() => this.goToLogin()}
                          >
                            Login
                          </a>
                        </div>

                        <div className='container' style={{ paddingTop: 60 }}>
                          <div className='row'>
                            <div className='col-lg-4 col-md-4 col-xs-12'></div>
                            <div className='col-lg-4 col-md-4 col-xs-12'>
                              <Form>
                                <Form.Group controlId='formBasicUser'>
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control
                                    ref={this.textInput}
                                    type='text'
                                    type='text'
                                    placeholder='Enter user'
                                  />
                                </Form.Group>

                                <Form.Group
                                  controlId='formBasicEmail'
                                  style={{ paddingTop: 20 }}
                                >
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    ref={this.emailInput}
                                    type='text'
                                    type='text'
                                    placeholder='Enter email'
                                  />
                                </Form.Group>
                                <Form.Text>
                                  We'll never share your email with anyone else.
                                </Form.Text>

                                <Form.Group
                                  controlId='formBasicPassword'
                                  style={{ paddingTop: 20 }}
                                >
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                    ref={this.passInput}
                                    type='text'
                                    type='password'
                                    placeholder='Password'
                                  />
                                </Form.Group>
                              </Form>
                              <Button
                                variant='primary'
                                type='submit'
                                onClick={() => this.signup()}
                              >
                                Submit
                              </Button>
                              <div style={{ paddingTop: 40 }}>
                                <a className='links' href='/'>
                                  Back
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
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
export default withRouter(App)

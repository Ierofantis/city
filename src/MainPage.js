import React from 'react'
import './App.css'
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from 'arwes'

export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {}

  goToLogin () {
    this.props.history.push('/Login');
  }

  goToSignup () {
    this.props.history.push('/Signup');
  }

  goToTheButton () {
    this.props.history.push('/TheButton');
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
                    <div>
                      <div style={{ padding: 20 }}>
                        <h1>Citizen</h1>
                        <div>You are not in danger </div>
                      </div>
                      <div>
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
                      <div style={{ paddingTop: 120 }}>
                        <h1>Press the alert button </h1>
                      </div>
                      <div style={{ paddingTop: 80 }}>
                        {localStorage.getItem('token') ? (
                          <Button
                            style={{ width: 300 }}
                            onClick={() => this.goToTheButton()}
                          >
                            Alert
                          </Button>
                        ) : (
                          <Button style={{ width: 300 }} disabled>
                            Signup or Login first
                          </Button>
                        )}
                      </div>
                    </div>
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

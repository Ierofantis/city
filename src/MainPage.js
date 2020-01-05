import React from 'react'
import './App.css'
import { ThemeProvider, createTheme, Row, Arwes, Col, Button } from 'arwes'

export default class MainPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {}

  goToLogin () {
    this.props.history.push('/Login')
  }

  goToSignup () {
    this.props.history.push('/Signup')
  }

  goToTheButton () {
    this.props.history.push('/TheButton')
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
                      <div style={{ paddingTop: 80 }}>
                        <Button onClick={() => this.goToSignup()}>
                          Signup
                        </Button>{' '}
                        or{' '}
                        <Button
                          onClick={() => this.goToLogin()}
                          style={{ cursor: 'pointer' }}
                        >
                          Login
                        </Button>
                      </div>
                      <div style={{ paddingTop: 120 }}>
                        <h1>Press the alert button </h1>
                      </div>
                      <div style={{ paddingTop: 80 }}>
                        <Button
                          style={{ width: 300 }}
                          onClick={() => this.goToTheButton()}
                        >
                          Alert
                        </Button>
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

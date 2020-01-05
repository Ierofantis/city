import React from 'react'
import './App.css'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

export default class MyNavbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      notify: true
    }
  }

  Logout () {
    this.setState({ loading: true })
    setTimeout(
      function () {
        this.setState({ loading: false })
        localStorage.removeItem('token')
        localStorage.removeItem('name')

        this.props.history.push('/')
      }.bind(this),
      1000
    )
  }

  goHome () {
    this.props.history.push('/TheButton')
  }

  goMap () {
    this.props.history.push('/Map')
  }

  goMyplaces () {
    this.props.history.push('/GetLocation')
  }

  Subscribe () {
    const publicVapidKey =
      'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo'
    this.setState({ notify: false })

    // Check for service worker
    if ('serviceWorker' in navigator) {
      send().catch(err => console.error(err))
    }

    // Register SW, Register Push, Send Push
    async function send () {
      // Register Service Worker
      console.log('Registering service worker...')
      const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
      })
      console.log('Service Worker Registered...')

      // Register Push
      console.log('Registering Push...')
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      })
      console.log('Push Registered...')

      // Send Push Notification
      console.log('Sending Push...')

      await fetch(
        'https://danger-button-backend.herokuapp.com/api/send/subscribe/save',
        {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      console.log('Push Sent...')
      localStorage.setItem('subscribed', true)
    }

    function urlBase64ToUint8Array (base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  }

  render () {
    let renderNavbar = true

    if (localStorage.getItem('subscribed') || this.state.notify === false) {
      renderNavbar = false
    }
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand onClick={() => this.goHome()}>Citizen</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link onClick={() => this.goHome()}>Home</Nav.Link>
            <NavDropdown title='Activity' id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={() => this.goMap()}>
                Alerts/Map
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.goMyplaces()}>
                My History
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => this.Logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            {renderNavbar ? (
              <Nav.Link
                style={{ color: '#F0431E' }}
                className='nav navbar-nav navbar-right'
                onClick={() => this.Subscribe()}
              >
                Notify Me!
              </Nav.Link>
            ) : (
              <Nav.Link className='nav navbar-nav navbar-right' disabled>
                Notify Me!
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

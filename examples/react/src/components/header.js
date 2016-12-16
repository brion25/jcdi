import React, { Component } from 'react';

import { invoke } from 'di';

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city : 'Lagos de Moreno',
      ip : ''
    }

    this.getIP = invoke(['fetch', this.getIP], this)
  }

  getIP(fetch) {
    const self = this

    fetch('https://ipapi.co/json/')
      .then(response => {
        self.setState({
          city : response.city,
          ip : response.ip
        })
      })
  }

  componentDidMount() {
    this.getIP()
  }

  render() {
    const { city, ip } = this.state

    return (
      <div data-component="header">
        <h1 className="main-header">IP Game!</h1>
        <h3 className="sub-header">
          You are in { city }
          <small>
            Based on your ip:
            <strong>{ ip }</strong>
          </small>
        </h3>
      </div>
    )
  }
}
import React, { Component } from 'react';

import { invoke } from 'di';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ip : '',
      city : '',
      country : '',
      region : '',
      reserved : false
    }

    this.getIp = this.getIp.bind(this)
    this.getLocationBasedOnIP = invoke(['fetch', this.getLocationBasedOnIP], this)
  }

  getIp(event) {
    const IP = event.target.value;

    this.setState({
      ip : IP
    })
  }

  getLocationBasedOnIP(fetch) {
    const self = this
    const { ip } = this.state

    fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => {
        self.setState({
          city : response.city,
          region : response.region,
          country : response.country,
          reserved : response.reserved,
          ipJSON : response.ip
        })
      })
  }

  render() {
    const { city, region, country, reserved, ipJSON } = this.state

    return (
      <div data-component="search" className="search">
        <input type="text" placeholder="Find the cities by IP" onChange={this.getIp} />
        <button onClick={this.getLocationBasedOnIP}>Search!</button>
        <div>
          <div className={`guessed-city ${reserved || !city ? 'hide' : ''}`}>
            <strong>This is your city: </strong>
            {city}, {region} {country}
          </div>
          <div className={`${!reserved ? 'hide' : ''}`}>
            <strong>Sorry the IP { ipJSON } is RESERVED</strong>
          </div>
        </div>
      </div>
    )
  }
}
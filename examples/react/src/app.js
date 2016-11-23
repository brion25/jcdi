import React, { Component } from 'react';
import { render } from 'react-dom';

import { initialize } from 'src/di.js';

const app = initialize('app-react');

app.addDependency({
  name : 'fetch',
  action : function(url, options = { method : 'GET' }) {
    return fetch(url, options)
      .then(response => response.json())
      .then(json => Promise.resolve(json))
  }
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city : 'Lagos de Moreno'
    }

    this.getIP = app.invoke(['fetch', this.getIP], this)
  }

  componentDidMount(){

  }

  getIP(fetch) {
    var self = this;
    fetch('https://ipapi.co/json/')
      .then(ip => {
        self.setState({
          city : ip.city
        })
      })
  }

  render() {
    const { city } = this.state;

    return (
      <div>
        <h2 onClick={this.getIP} >Weather in { city }</h2>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
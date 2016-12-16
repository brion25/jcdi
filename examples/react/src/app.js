require('./scss/manifest.scss');

import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from 'src/components/header';
import Search from 'src/components/search';

import './di';

class App extends Component {
  render() {
    return (
      <div data-component="App" className="app">
        <Header/>
        <hr />
        <Search/>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)
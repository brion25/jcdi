require('./scss/manifest.scss');

import React, { Component } from 'react';
import { render } from 'react-dom';

import Header from './components/header';
import Search from './components/search';

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
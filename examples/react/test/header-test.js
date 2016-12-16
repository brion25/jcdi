import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import 'src/di'
import Header from 'src/components/header'

import { goodResponseDefault } from './mocks'

describe('<Header />', function() {
  it('should render properly', () => {
    const header = mount(
      <Header/>
    )

    expect(header.find('.main-header').length).equal(1)
    expect(header.find('.sub-header').length).equal(1)
  })

  it('should fetch the current IP', function(done) {
    const header = mount(
      <Header/>
    )

    setTimeout(function(){
      const { city, ip } = header.state()

      expect(city).equal(goodResponseDefault.city)
      expect(ip).equal(goodResponseDefault.ip)
      done()
    },0)
  })
})

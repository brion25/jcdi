import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import 'src/di'
import Search from 'src/components/search'

import {
  goodResponseDefault,
  goodResponseToSearch,
  ipToSearch
} from './mocks'

describe('<Search />', function() {
  it('should render properly', () => {
    const search = mount(
      <Search/>
    )

    expect(search.find('.search').length).equal(1)
    expect(search.find('.search input').length).equal(1)
    expect(search.find('.search button').length).equal(1)
  })

  it('should fetch the city details when the user want to search IPs', function() {
    const search = mount(
      <Search/>
    )

    search.find('input').simulate('change',{ target : { value : ipToSearch } })
    search.find('button').simulate('click')

    setTimeout(function(){
      const { city, region, country, ip } = search.state()

      expect(ip).equal(ipToSearch)
      expect(city).equal(goodResponseToSearch.city)
      expect(region).equal(goodResponseToSearch.region)
      expect(country).equal(goodResponseToSearch.country)
      done()
    },0)

  })
})

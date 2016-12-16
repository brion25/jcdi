import { expect } from 'chai'
import { mount } from 'enzyme'

import Header from 'components/header'

describe('<Header />', function() {
  it('should pass', () => {
    mount(
      <Header/>
    )
  })
})
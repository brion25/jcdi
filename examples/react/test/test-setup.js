import 'jsdom-global/register'
import fetchMock from 'fetch-mock'

import {
  goodResponseDefault,
  goodResponseToSearch,
  ipToSearch
} from './mocks'

fetchMock.get('https://ipapi.co/json/', goodResponseDefault);
fetchMock.get(`https://ipapi.co/${ipToSearch}/json/`, goodResponseToSearch);

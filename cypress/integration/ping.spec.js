/// <reference types="cypress"/>

import requests from '../support/api/requests';
import assertions from '../support/api/assertions';
context('Ping', () => {
  it('GET Healtcheck', () => {
    requests.getPing().then(getPingResponse => {
      assertions.shouldHaveStatus(getPingResponse, 201);
    });
  });
});

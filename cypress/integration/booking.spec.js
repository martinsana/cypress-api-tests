/// <reference types="cypress"/>

import requests from '../support/api/requests';
import assertions from '../support/api/assertions';
import schemas from '../support/api/schemas';
import spok from 'cy-spok';

context('Bokking', () => {
  it('GET Booking', () => {
    requests.getBooking().then(getBookingResponse => {
      assertions.shouldHaveStatus(getBookingResponse, 200);
      assertions.validateContractOf(
        getBookingResponse,
        schemas.getBookingSchema()
      );
    });
  });

  it('Post Booking', () => {
    requests.postBooking().then(postBookingResponse => {
      assertions.shouldHaveStatus(postBookingResponse, 200);
    });
  });
});

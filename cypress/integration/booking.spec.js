/// <reference types="cypress"/>

import requests from '../support/api/requests';
import assertions from '../support/api/assertions';
import schemas from '../support/api/schemas';
import spok from 'cy-spok';

context('Bokking', () => {
  before(() => {
    requests.doAuth();
  });

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
      assertions.bookingIdIsNotNull(postBookingResponse);
      assertions.defaulHeader(postBookingResponse);
      assertions.contentType(postBookingResponse);
      assertions.durationLessThan(postBookingResponse, 900);
    });
  });

  it('PUT Booking - Without token', () => {
    requests.postBooking().then(postBookingResponse => {
      requests
        .updateBookingWithoutToken(postBookingResponse)
        .then(putBookingResponse => {
          assertions.shouldHaveStatus(putBookingResponse, 403);
        });
    });
  });

  it('PUT Booking - Invalid token', () => {});

  it('PUT Booking - Success', () => {
    requests.postBooking().then(postBookingResponse => {
      requests.updateBooking(postBookingResponse).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 200);
      });
    });
  });

  it('DELETE Booking - Without token', () => {
    requests.postBooking().then(postBookingResponse => {
      requests
        .deleteBookingWithoutToken(postBookingResponse)
        .then(deleteBookingResponse => {
          assertions.shouldHaveStatus(deleteBookingResponse, 403);
        });
    });
  });

  it('DELETE Booking - Success', () => {
    requests.postBooking().then(postBookingResponse => {
      requests
        .deleteBooking(postBookingResponse)
        .then(deleteBookingResponse => {
          assertions.shouldHaveStatus(deleteBookingResponse, 201);
        });
    });
  });
});

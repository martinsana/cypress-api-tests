class Assertions {
  shouldHaveStatus(response, status) {
    expect(response.status, `status is ${status}`).to.eq(status);
  }

  validateContractOf(response, schema) {
    return cy.wrap(response.body, `contract match`).should(schema);
  }

  bookingIdIsNotNull(response) {
    expect(response.body.bookingid, 'bookingid exists').to.not.be.null;
  }

  defaulHeader(response) {
    expect(response.headers, 'default headers').to.include({
      server: 'Cowboy',
      connection: 'keep-alive',
      'x-powered-by': 'Express',
    });
  }

  contentType(response) {
    expect(response.headers, 'content-type').to.include({
      'content-type': 'application/json; charset=utf-8',
    });
  }

  durationLessThan(response, time) {
    expect(response.duration, `duration less than ${time}ms`).lessThan(time);
  }
}

export default new Assertions();

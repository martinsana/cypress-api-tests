class Requests {
  getPing() {
    return cy.request({
      method: 'GET',
      url: '/ping',
    });
  }

  getBooking() {
    return cy.request({
      method: 'GET',
      url: '/booking/1',
    });
  }

  postBooking() {
    return cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: 'Ana',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2020-01-01',
          checkout: '2020-01-02',
        },
        additionalneeds: 'Breakfast',
      },
    });
  }

  updateBookingWithoutToken(response) {
    const bookingid = response.body.bookingid;
    return cy.request({
      method: 'PUT',
      url: `/booking/${bookingid}`,
      body: {
        firstname: 'Jim',
        lastname: 'James',
        totalprice: 111,
        depositpaid: false,
        bookingdates: {
          checkin: '2020-01-01',
          checkout: '2020-01-02',
        },
        additionalneeds: 'Breakfast',
      },
      failOnStatusCode: false,
    });
  }
  updateBooking(response) {
    const bookingid = response.body.bookingid;
    return cy.request({
      method: 'PUT',
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`,
      },
      body: {
        firstname: 'Jim',
        lastname: 'James',
        totalprice: 111,
        depositpaid: false,
        bookingdates: {
          checkin: '2020-01-01',
          checkout: '2020-01-02',
        },
        additionalneeds: 'Breakfast',
      },
      failOnStatusCode: false,
    });
  }

  deleteBookingWithoutToken(response) {
    const bookingid = response.body.bookingid;
    return cy.request({
      method: 'DELETE',
      url: `/booking/${bookingid}`,
      failOnStatusCode: false,
    });
  }

  deleteBooking(response) {
    const bookingid = response.body.bookingid;
    return cy.request({
      method: 'DELETE',
      url: `/booking/${bookingid}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`,
      },
      failOnStatusCode: false,
    });
  }

  postAuth() {
    return cy.request({
      method: 'POST',
      url: '/auth',
      body: {
        username: 'admin',
        password: 'password123',
      },
    });
  }

  doAuth() {
    this.postAuth().then(postAuthResponse => {
      const token = postAuthResponse.body.token;

      Cypress.env('token', token);
    });
  }
}

export default new Requests();

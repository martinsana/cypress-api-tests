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
}

export default new Requests();

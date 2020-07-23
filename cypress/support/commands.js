Cypress.Commands.add('loginAndVisit', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('validatedBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

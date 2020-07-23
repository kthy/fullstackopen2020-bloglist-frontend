const randomString = require('crypto-random-string')

let user

describe('Bloglist app', function() {
  before(function() {
    cy.fixture('testUser').then((json) => {
      user = json
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })
  })

  describe('when not logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
      cy.contains('Log in to application')
    })

    it('login fails with wrong password', function() {
      cy.get('#usernameInput').type(user.username)
      cy.get('#passwordInput').type('1234')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain', 'invalid username or password')
    })

    it('user can login', function() {
      cy.get('#usernameInput').type(user.username)
      cy.get('#passwordInput').type(user.password)
      cy.get('#loginButton').click()
      cy.contains('Cupressus Sempervirens is logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.loginAndVisit({ username: user.username, password: user.password })
    })

    it('a new blog entry can be created', function() {
      const rs = (len) => randomString({ length: len, type: 'distinguishable' })
      const ri = (max) => Math.ceil(max * Math.random())
      const title = [rs(ri(8)), rs(ri(8)), rs(ri(8)), rs(ri(8)), rs(ri(8))].join(' ')
      cy.contains('add blog entry').click()
      cy.get('#blogFormTitle').type(title)
      cy.get('#blogFormAuthor').type(`${rs(ri(6))} ${rs(ri(16))}`)
      cy.get('#blogFormUrl').type(`https://${rs(ri(26))}.com`)
      cy.contains('save').click()
      cy.contains(title)
    })
  })
})

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
      cy.visit('/')
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
      const title = 'TDD harms architecture'
      cy.contains('add blog entry').click()
      cy.get('#blogFormTitle').type(title)
      cy.get('#blogFormAuthor').type('Robert C. Martin')
      cy.get('#blogFormUrl').type('http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html')
      cy.contains('save').click()
      cy.visit('/')
      cy.contains(title)
    })

    it('a blog entry can be liked', function() {
      cy.addBlogAndVisit()
      cy.contains('view').click()
      cy.contains('Likes: 0')
      cy.contains('+1').click()
      cy.visit('/')
      cy.contains('view').click()
      cy.contains('Likes: 1')
    })
  })
})

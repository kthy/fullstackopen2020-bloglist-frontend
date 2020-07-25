const randomString = require('crypto-random-string')
const uppercaseAscii = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const lowercaseAscii = uppercaseAscii.toLowerCase()
const randomInt = (max) => Math.ceil(max * Math.random())
const word = (maxLength, initialCapital = true) => {
  const len = Math.max(1, randomInt(parseInt(maxLength, 10)))
  if (len === 1) return initialCapital ? 'A' : 'a'
  return initialCapital
    ? randomString({ length: 1, characters: uppercaseAscii }) + randomString({ length: len - 1, characters: lowercaseAscii })
    : randomString({ length: len, characters: lowercaseAscii })
}

const tokenKey = 'validatedBloglistUser'

Cypress.Commands.add('loginAndVisit', ({ username, password }) => {
  cy
    .request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem(tokenKey, JSON.stringify(body))
      cy.visit('/')
    })
})

Cypress.Commands.add('addBlog', (likes) => {
  const token = JSON.parse(localStorage.getItem(tokenKey)).token
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      auth: {
        username: null,
        password: null,
        bearer: token
      },
      body: {
        author: `${word(10)} ${word(1)}. ${word(24)}`,
        title: [randomInt(10), randomInt(10), randomInt(10), randomInt(10)].map(word).join(' '),
        url: `http://www.${word(32, false)}.com/${word(12, false)}.html`,
        likes
      }
    })
})

Cypress.Commands.add('addBlogAndVisit', (likes) => cy.addBlog(likes).then(_ => cy.visit('/')))

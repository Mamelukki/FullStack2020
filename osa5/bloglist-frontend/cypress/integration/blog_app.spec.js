describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password') 
      cy.get('.error').should('have.css', 'color', 'rgb(139, 0, 0)')
      cy.get('.error').should('have.css', 'backgroundColor', 'rgb(240, 128, 128)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    beforeEach(function() {
      cy.createBlog({ title: 'testiotsikko1', author: 'testikirjoittaja1', url: 'testiosoite1', likes: 0 })
      cy.createBlog({ title: 'testiotsikko2', author: 'testikirjoittaja2', url: 'testiosoite2', likes: 2 })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('testikirjoittaja')
      cy.get('#url').type('testiurl')
      cy.get('#create-button').click()
      cy.contains('A new blog testiblogi by testikirjoittaja added')
      cy.contains('testiblogi testikirjoittaja')
    })

    it('A like can be given to a blog', function() {
      cy.contains('testiotsikko1').contains('view').click()
      cy.contains('testiotsikko1').get('#like-button').click()
      cy.contains('testiotsikko1').parent().should('contain', 'likes 1')
    })

    it('A user who created the blog can remove it', function() {
      cy.contains('testiotsikko1').contains('view').click()
      cy.contains('testiotsikko1').get('#remove-button').click()
      cy.get('testiotsikko1').should('not.exist')
    })
  })
})
describe('Blog app', function(){
  beforeEach(function(){
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'guchooo',
      username: '2saucy',
      password: '1234',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })
  it('Login form is shown', function(){
    cy.get('html')
      .should('contain', 'Log in to application')
      .and('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('2saucy')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('guchooo logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('2saucy')
      cy.get('#password').type('wrongpass')
      cy.get('#login-button').click()

      //cy.get('.error-notification').contains('invalid username or password')

      cy.get('.error-notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'guchooo logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({ username: '2saucy', password: '1234' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Testing with cypress')
      cy.get('#author').type('guchooo')
      cy.get('#url').type('http://suhadqwuenjcns.com')
      cy.contains('create').click()
    })
  })

  describe('When blog exists', function(){
    beforeEach(function(){
      cy.login({ username: '2saucy', password: '1234' })
      cy.createBlog({ title: 'Testing with cypress', author: 'guchooo', url: 'http://suhadqwuenjcns.com' })
      const user = {
        name: 'someone',
        username: 'secondUser',
        password: '1234',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    })

    it('User can like a blog', function(){
      cy.contains('view').click()
      cy.contains('like').click()

      cy.get('.blog__likes')
        .should('contain', 1)
    })

    it('User that make a blog can delete it too', function(){
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.success-notification')
        .should('contain', 'the blog was successfully removed')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Testing with cypress')
    })

    it('Only user who created the blog can delete it', function(){
      cy.contains('logout').click()
      cy.login({ username: 'secondUser', password: '1234' })
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })

  describe('When multiple blogs exists', function(){
    beforeEach(function(){
      cy.login({ username: '2saucy', password: '1234' })
      cy.createBlog({ title: 'The title with the second most likes', author: 'guchooo', url: 'http://suhadqwuenjcns.com' })
      cy.createBlog({ title: 'The title with the most likes', author: 'guchooo', url: 'http://suhadqwuenjcns.com' })
    })

    it('They are ordered by number of likes', function(){
      cy.get('.blog').eq(0).should('contain', 'The title with the second most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the most likes')

      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.like-button').click()

      cy.get('.blog').eq(0).should('contain', 'he title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})
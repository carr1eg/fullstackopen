describe('Note app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.intercept('GET', '/api/blogs').as('getBlogs')
    cy.wait('@getBlogs')
   
  })
  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'admin',
        username: 'admin',
        password: 'admin'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
  
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('log out').click()
    })
    
    it('fails with wrong credentials', function() {
      cy.get('#username').type('a123456')
      cy.get('#password').type('a123456')
      cy.get('#login-button').click()
      cy.get('.notification').should('contain', 'invalid')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('Blog app', function() {
    // ...
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'admin', password: 'admin' })
        })
      it('A blog can be created', function() {
        cy.get('#create-blog').click()
        cy.get(':nth-child(1) > input').type('another title')
        cy.get(':nth-child(2) > input').type('another dev')
        cy.get(':nth-child(3) > input').type('another link')
        cy.get('#submit-button').click()
        cy.visit('http://localhost:3000')
        cy.contains('view').click()
        cy.contains('another link')
      })

      it('A blog can be liked', function() {
    
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      
      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.get('.blog').should('not.exist')
        cy.get('.notification').should('contain', 'deleted')
        .and('have.css', 'border-style', 'solid')
      })
    }) 
    
    describe('Blogs are ranked in the order of likes', function() {
      beforeEach(function () {
        cy.get('#create-blog').click()
        cy.get(':nth-child(1) > input').type('first title')
        cy.get(':nth-child(2) > input').type('first dev')
        cy.get(':nth-child(3) > input').type('first link')
        cy.get('#submit-button').click()
        cy.get('#create-blog').click()
        cy.get(':nth-child(1) > input').type('second title')
        cy.get(':nth-child(2) > input').type('second dev')
        cy.get(':nth-child(3) > input').type('second link')
        cy.get('#submit-button').click()
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })


      it('Blogs are ranked in the order of likes', function() {
        cy.get('.blog').then(blog => {
          console.log('blog :>> ', blog);
        })
        
      })

    })
  })

})
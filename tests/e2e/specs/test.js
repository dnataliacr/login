   // https://docs.cypress.io/api/introduction/api.html

   describe('Login', () => {

    it('Successful login', () => {
      
      cy.visit('/')
  
      cy.get('input[name=email]').type("inforankingpar@aequales.com")
  
      cy.get('input[name=password]').type(`Aequales10*`)
  
      cy.contains('Submit').click()
  
      cy.get('h2').should('contain', 'Aitor')
    })
  
    it('Incorrect login', () => {
      
      cy.visit('/')
  
      cy.get('input[name=email]').type("inforankingpar@aequales.com")
  
      cy.get('input[name=password]').type(`wrong passsword`)
  
      cy.contains('Submit').click()
  
      cy.on('window:alert',(txt)=>{
  
        expect(txt).to.contains('Las credenciales introducidas no coinciden con nuestras bases. Por favor, inténtelo nuevamente.  Código Error: 127');
     })
    })
  })
  
describe('Navegação no site Guru99 para acessar o tutorial AngularJS', () => {
  it('Deve acessar a seção Web e abrir o tutorial de AngularJS', () => {
    cy.visit('https://www.guru99.com/')
    cy.contains('Tutorials Library').click()
    cy.contains('button', 'Web').click()
    cy.get('a[href="/angularjs-tutorial.html"]').click()
  })
})


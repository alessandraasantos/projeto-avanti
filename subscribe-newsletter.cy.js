import { faker } from '@faker-js/faker'

//Cria um número e um email aleatórios
const randomNumber = Math.floor(Math.random() * 1000000);
const randomEmail = faker.internet.email();

//Combina o número com o email para criar um valor único
const uniqueEmail = `${randomNumber}_${randomEmail}`;

describe('template spec', () => {
  it('passes', () => {
    //Visita a página da GURU99
    cy.visit('https://www.guru99.com/');

    //Clica no botão de assinatura da newsletter
    cy.get('a[href="https://www.guru99.com/newsletters.html"]').invoke('removeAttr', 'target').click();

    //Checa se a página está na URL correta
    cy.url().should('eq', 'https://www.guru99.com/newsletters.html');

    //Digita o email único no campo
    cy.get('#awf_field-117744915').type(uniqueEmail);

    //Clica no botão Submit
    cy.get('.af-textWrap > .submit').click();

    //Checa se a página está na URL correta
    cy.url().should('eq', 'https://mymail.guru99.com/thank-you-subscribers.html');

    //Checa se a mensagem de sucesso na inscrição aparece
    cy.contains('Thank you for Signup!').should('be.visible');
    

  })
})
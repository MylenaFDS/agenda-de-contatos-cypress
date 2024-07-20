describe('Agenda de Contatos', () => {
  const baseUrl = 'https://agenda-contatos-react.vercel.app/';
  
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(1000); // Aguarda 1 segundo para garantir que a página carregue completamente
  });
  
  it('Deve incluir um novo contato', () => {
    cy.get('[placeholder="Nome"]').type('João Silva');
    cy.get('[placeholder="E-mail"]').type('joao.silva@example.com');
    cy.get('[placeholder="Telefone"]').type('123456789');
    cy.get('.adicionar').click();
  
    cy.contains('João Silva').should('be.visible');
    cy.contains('joao.silva@example.com').should('be.visible');
    cy.contains('123456789').should('be.visible');
  });
  
  it('Deve alterar um contato existente', () => {
    // Adicione um novo contato para garantir que haja um contato para alterar
    cy.get('[placeholder="Nome"]').type('Maria Oliveira');
    cy.get('[placeholder="E-mail"]').type('maria.oliveira@example.com');
    cy.get('[placeholder="Telefone"]').type('987654321');
    cy.get('.adicionar').click();
    
    // Verifique se o contato foi adicionado corretamente
    cy.contains('Maria Oliveira').should('be.visible');
    cy.contains('maria.oliveira@example.com').should('be.visible');
    cy.contains('987654321').should('be.visible');
  
    // Encontre o contato recém-adicionado e clique no botão de editar
    cy.contains('Maria Oliveira')
      .closest('.contato') // Encontre o elemento pai mais próximo com a classe 'contato'
      .find('.edit')       // Encontre o botão de edição dentro desse elemento
      .click();
    
    // Atualize os detalhes do contato
    cy.get('[placeholder="Nome"]').clear().type('Maria Souza');
    cy.get('[placeholder="E-mail"]').clear().type('maria.souza@example.com');
    cy.get('[placeholder="Telefone"]').clear().type('112233445');
    
    // Clique no botão para salvar as alterações
    cy.get('.alterar').click();
    
    // Verifique se o contato foi atualizado corretamente
    cy.contains('Maria Souza').should('be.visible');
    cy.contains('maria.souza@example.com').should('be.visible');
    cy.contains('112233445').should('be.visible');
    
    // Verifique se o contato antigo foi removido
    cy.contains('Maria Oliveira').should('not.exist');
    cy.contains('maria.oliveira@example.com').should('not.exist');
    cy.contains('987654321').should('not.exist');
  });
  
  
  
  it('Deve remover um contato', () => {
    // Adicione um novo contato para garantir que haja um contato para remover
    cy.get('[placeholder="Nome"]').type('Ana Costa');
    cy.get('[placeholder="E-mail"]').type('ana.costa@example.com');
    cy.get('[placeholder="Telefone"]').type('556677889');
    cy.get('.adicionar').click();
    
    // Verifique se o contato foi adicionado corretamente
    cy.contains('Ana Costa').should('be.visible');
    cy.contains('ana.costa@example.com').should('be.visible');
    cy.contains('556677889').should('be.visible');
    
    // Encontre o contato recém-adicionado e clique no botão de remover
    cy.contains('Ana Costa')
      .closest('.contato')  // Encontre o elemento pai mais próximo com a classe 'contato'
      .find('.delete')      // Encontre o botão de deletar dentro desse elemento
      .click();
    
    // Verifique se o contato foi removido corretamente
    cy.contains('Ana Costa').should('not.exist');
    cy.contains('ana.costa@example.com').should('not.exist');
    cy.contains('556677889').should('not.exist');
  });
  
});


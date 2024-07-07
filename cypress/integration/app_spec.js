// describe('App Component', () => {
//     beforeEach(() => {
//       cy.visit('/');
//     });
  
//     it('adds and removes destinations', () => {
//       // Check initial state
//       cy.get('input[placeholder="e.g. London"]').should('have.length', 1);
  
//       // Add a destination
//       cy.contains('Add additional destination').click();
//       cy.get('input[placeholder="e.g. London"]').should('have.length', 2);
  
//       // Delete the first destination
//       cy.get('span').contains('🗑️').first().click();
  
//       // Check state after deletion
//       cy.get('input[placeholder="e.g. London"]').should('have.length', 1);
//       cy.get('span').contains('🗑️').should('have.length', 1);
//     });
//   });
  
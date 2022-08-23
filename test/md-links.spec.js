const api = require('../src/api');


describe('mdLinks', () => {

  it('debería ser una función', () => {
    expect(typeof api.mdLinks()).toBe('function');
  });

});

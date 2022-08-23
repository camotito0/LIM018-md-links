const utils = require('../src/utils');

describe('utils.extentionFile()', () => {
    it('debería ser una función', () => {
      expect(typeof utils.extentionFile).toBe('function');
    });
    it('debería mostrarse en consola la extensión del archivo', () => {
        // spyOn recibe dos parametros, el objeto que contiene los métodos y el método a testear
        const logSpy = jest.spyOn(console, 'log');
        //utils.extentionFile('.../prueba/prueba.md')
        console.log(utils.extentionFile('.../prueba/prueba.md'))
        //console.log(logSpy.mock.calls[0][0])
        expect(logSpy.mock.calls[0][0]).toEqual('.md')
    });
});

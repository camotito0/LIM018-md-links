const utils = require('../src/utils');
const axios = require('axios');
const theTestPath = './prueba/prueba.md';

describe('utils.extentionFile()', () => {
    it('debería ser una función', () => {
      expect(typeof utils.extentionFile).toBe('function');
    });
    it('debería mostrar la extensión del archivo', () => {
      expect(utils.extentionFile(theTestPath)).toEqual('.md')
    });
});

describe('utils.thePathExist()', () => {
    it('debería ser una función', () => {
      expect(typeof utils.thePathExist).toBe('function');
    });
    it('debería retornar true si es que existe', () => {
      expect(utils.thePathExist(theTestPath)).toBe(true);
    });
});

describe('utils.isAFullPath()', () => {
  it('debería ser una función', () => {
    expect(typeof utils.isAFullPath).toBe('function');
  });
  it('debería resolver la ruta relativa a absoluta', () => {
    const absolutePath = '/mnt/c/Users/USUARIO/LIM018-md-links/prueba/prueba.md';
    expect(utils.isAFullPath(theTestPath)).toEqual(absolutePath)
  });
});

describe('utils.fileOrDirectory()', () => {
  it('debería ser una función', () => {
    expect(typeof utils.fileOrDirectory).toBe('function');
  });
  it('debería retornar true si es un directorio', () => {
    expect(utils.fileOrDirectory(theTestPath)).toBe(false)
  });
});

describe('utils.extractingPaths()', () => {
  it('debería ser una función', () => {
    expect(typeof utils.extractingPaths).toBe('function');
  });
  it('debería retornar un array que contenga la ruta obtenida (test archivo)', () => {
    const pathFile = './README.md';
    const result =   [ './README.md' ]
    expect(utils.extractingPaths(pathFile)).toEqual(result);
  });
  it('debería retornar un array que contenga las rutas obtenidas (test directorio)', () => {
    const pathDirectory = './prueba';
    const result = ['./README.md', "prueba/prueba.md", "prueba/prueba2.md"];
    expect(utils.extractingPaths(pathDirectory)).toEqual(result)
  });
});

describe('utils.extractingLinks()', () => {
  it('debería ser una función', () => {
    expect(typeof utils.extractingLinks).toBe('function');
  });
  it('debería recorrer el array de rutas y extraer los links', () => {
    const arrayPaths = [ 'prueba/prueba.md', 'prueba/prueba2.md' ];
    const result =  [
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file: 'prueba/prueba.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'Node.js file system - Documentación oficial',
        file: 'prueba/prueba.md'
      },
      {
        href: 'https://nodejs.org/es/about/',
        text: 'Acerca de Node.js - Documentación oficial',
        file: 'prueba/prueba2.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'Node.js file system - Documentación oficial',
        file: 'prueba/prueba2.md'
      }
    ]
    expect(utils.extractingLinks(arrayPaths)).toEqual(result)
  });
});

describe('utils.validateLinks()', () => {
  const testArrayLinks = [
    {
      href: 'https://nodejs.org/api/fs.html',
      text: 'Node.js file system - Documentación oficial',
      file: '/mnt/c/Users/USUARIO/LIM018-md-links/prueba/prueba2.md'
    }
  ]

  it('debería ser una función', () => {
    expect(typeof utils.validateLinks).toBe('function');
  });
  it('debería resolverse al validar el href del objeto y devolver el objeto actualizado con estatus y message', () => {
    // spyOn recibe dos parametros, el objeto que contiene los métodos y el método a testear
    const getSpy = jest.spyOn(axios, 'get');
    axios.get.mockImplementation((_link_) => Promise.resolve({
      ...[testArrayLinks],
      status: 200,
      message:  'OK'
    }))

    const result = utils.validateLinks(testArrayLinks);
    result
    .then((link) => {
      expect(link).toHaveLength(1);
      expect(link[0].value.status).toEqual(200);
      expect(link[0].value.message).toEqual('OK');
    });

  });

  it('debería fallar al validar el href del objeto y devolver el objeto actualizado con estatus y message', () => {
    const getSpy = jest.spyOn(axios, 'get');
    axios.get.mockImplementation((_link_) => Promise.reject({
      ...[testArrayLinks],
      status: 'something went wrong',
      message:  'FAIL'
    }))

    const result = utils.validateLinks(testArrayLinks);
    result
    .then((link) => {
      expect(link).toHaveLength(1);
      expect(link[0].value.status).toEqual('something went wrong');
      expect(link[0].value.message).toEqual('FAIL');
    });
  });
});

describe('utils.statsLinks()', () => {
  it('debería ser una función', () => {
    expect(typeof utils.statsLinks).toBe('function');
  });
  it('debería devolver un array con las estidísticas', () => {
    const testArrayLinks = [
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'Node.js file system - Documentación oficial',
        file: '/mnt/c/Users/USUARIO/LIM018-md-links/prueba/prueba2.md'
      }
    ]
    let result = [];
    result.total = 1;
    result.unique = 1;
    expect(utils.statsLinks(testArrayLinks)).toEqual(result);
  });
});

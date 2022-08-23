#! /usr/bin/env node
const mdLinks = require('./api.js');
const process = require('process');
const inputDta = [...process.argv];

console.log(inputDta)

if(inputDta.length === 2) {
    console.log('Ingresa un archivo o carpeta a examinar')
}

if(inputDta.length === 3 && inputDta[2] === '--help') {
    console.log(`
        OPTIONS:
        > --validate
            * href: URL encontrada.
            * text: Texto que aparecía dentro del link.
            * file: Ruta del archivo donde se encontró el link.
            * status: Código de respuesta HTTP.
            * ok: Mensaje fail en caso de fallo u ok en caso de éxito.
        > --stats
            * Total: total de links encontrados.
            * Unique: total de links unicos encontrados.
        > --stats --validate
            * Total: total de links encontrados.
            * Unique: total de links unicos encontrados.
            * Broke: total de links rotos.
    `)
}

if(inputDta.length === 3 ) {
    mdLinks(inputDta[2], {validate : false} )
    .then((links) => { console.log(links)})
    .catch(() => console.log('Algo salio mal'))
}

if(inputDta.length === 4 && inputDta[3] === '--validate') {
    mdLinks(inputDta[2], {validate : true})
    .then((links) => { console.log(links)})
    .catch(() => console.log('Algo salio mal'))
}
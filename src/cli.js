#! /usr/bin/env node
const mdLinks = require('./api.js');
const process = require('process');
const styles = require('./stylesOutput.js')
const [, , ...finalArgs] = process.argv;


if(finalArgs.length === 0) {
    console.log(styles.stylingOutput())
}

if(finalArgs[0] === '--help') {
    console.log(styles.stylingOutputHelp());
}

if(finalArgs.length === 1 && finalArgs[0] !== '--help') {
    mdLinks(finalArgs[0], {validate : false} )
    .then((links) => { console.log(styles.stylingOutputDefault(links))})
    .catch(() => console.log('Algo salio mal'))
}

if(finalArgs.length === 2 && (finalArgs[1] === '--validate' || finalArgs[1] === '--v')) {
    mdLinks(finalArgs[0], {validate : true})
    .then((links) => { console.log(styles.stylingOutputDefault(links))})
    .catch(() => console.log('Algo  mal'))
}

if(finalArgs.length === 2 && (finalArgs[1] === '--stats' || finalArgs[1] === '--s')) {
    mdLinks(finalArgs[0], {stats : true})
    .then((links) => { console.log(styles.stylingOutputStats(links)) })
    .catch(() => console.log('Algo  mal'))
}

if(finalArgs.length === 3 && (finalArgs[1] === '--stats' && finalArgs[2] === '--validate' || finalArgs[1] === '--s' && finalArgs[2] === '--v')) {
    mdLinks(finalArgs[0], {statsValidate : true})
    .then((links) => { console.log(styles.stylingOutputStats(links)) })
    .catch(() => console.log('Algo  mal'))
}
 
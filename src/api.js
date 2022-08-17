//import * as utils from 'utils.js';
const utils = require('./utils');
const path = require('path');
const data = [...process.argv];

const mdLinks = (path, options) => {
    new Promise((resolve, reject) => {
        if(utils.thePathExist(path)){
            const fullPath = utils.isAFullPath(path)
            const paths = utils.extractingPaths(fullPath);
            const links = utils.extractingLinks(paths);
            utils.validateLinks(links)
            //console.log(fullPath)
            
            /* if(utils.extractingPaths(path)){

            }
            resolve(path) */
        }
    });
}

mdLinks(data[2])
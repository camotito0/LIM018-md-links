const utils = require('./utils');

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if(utils.thePathExist(path)){
            const fullPath = utils.isAFullPath(path)
            const paths = utils.extractingPaths(fullPath);
            if(paths.length !== 0) {
                const arrayLinks = utils.extractingLinks(paths);
                if(arrayLinks.length !== 0 && options.validate === true){
                    utils.validateLinks(arrayLinks)
                    .then((infoArray) => {
                        let infoLinks =  infoArray.map((info) => {
                            return info.value;
                        })
                        resolve(infoLinks);
                    })
                } else if(arrayLinks.length !== 0 && options.stats === true) {
                    resolve(utils.statsLinks(arrayLinks));
                } else if(arrayLinks.length !== 0 && options.statsValidate === true ) {
                        utils.validateLinks(arrayLinks)
                        .then((links) => {
                            const infoStats = utils.validateLinksStats(links)
                            resolve(infoStats);
                        })
                } else if(arrayLinks.length !== 0){
                    resolve(arrayLinks)
                } else {
                    reject(new Error('El archivo no contiene ningún link')) 
                }
            } else {
                reject(new Error('La ruta no es un archivo md o no hay archivos md dentro de la carpeta'))
            }
        } else {
            reject(new Error('El archivo no existe'))
        }
    });
}

module.exports = mdLinks ;

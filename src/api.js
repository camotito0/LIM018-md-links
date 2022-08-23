const utils = require('./utils');

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if(utils.thePathExist(path)){
            const fullPath = utils.isAFullPath(path)
            const paths = utils.extractingPaths(fullPath);
            if(paths.length !== 0) {
                const links = utils.extractingLinks(paths);
                if(links.length !== 0 && options.validate === true){
                    utils.validateLinks(links)
                    .then((infoArray) => {
                        let infoLinks =  infoArray.map((info) => {
                            return info.value;
                        })
                        resolve(infoLinks);
                    })
                }else if(links.length !== 0 ){
                    resolve(links)
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
//mdLinks(data[2])
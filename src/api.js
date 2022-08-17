const utils = require('./utils');
const data = [...process.argv];

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if(utils.thePathExist(path)){
            const fullPath = utils.isAFullPath(path)
            const paths = utils.extractingPaths(fullPath);
            if(paths.length !== 0) {
                const links = utils.extractingLinks(paths);
                if(links.length !== 0){
                    utils.validateLinks(links)
                    .then((infoArray) =>
                        infoArray.map((info) => {
                            resolve(info.value)
                        })
                    )
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

mdLinks(data[2])
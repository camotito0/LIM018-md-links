const process = require('process');
const fs = require('fs');
const path = require('path');

// process.argv recibe argumentos en el proceso de node.js, en este caso guarda
// el bin, archivo del proceso con node (utils.js) -> se guarda la ruta completa del archivo
// y el argumento extra que sería el path
const data = [...process.argv];
/* const regexLinks = /\[([^\[]+)\](\(.*\))/gm ;

const matchLinks = (dta) => {
    return dta.match(regexLinks);
}

const extentionFile = (file) => {
	return path.extname(file)
}

const fileOrDirectory = (path) => {
   if (fs.statSync(path).isFile()) return path;
	 else {}
}

const readingFile = () => {
	// el segundo parametro es para el encode del archivo
	if(extentionFile(data[2]) === '.md'){
		const dta = fs.readFileSync(data[2], 'utf8')
		//console.log(fs.readFileSync(data[2], 'utf8'))
		console.log(matchLinks(dta).length);
	} else return console.log('error')
}
 */
const thePathExist = (filePath) => {
	// fs.existsSync verificamos si la ruta pasada existe o no
	return fs.existsSync(filePath)
}

const isAFullPath = (filePath) => {
	// path.isAbsolute ve si el path introducido es un 'fullpath' (ruta completa), retorna un booleano
	// si no es así entonces con path resolve sacamos la ruta actual del documento y lo unimos con la ruta que nos pasan
	// console.log(path.isAbsolute(filePath) ? 'true' : 'nono')
	return path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
}

isAFullPath(data[2]);
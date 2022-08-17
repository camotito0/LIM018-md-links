const process = require('process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// process.argv recibe argumentos en el proceso de node.js, en este caso guarda
// 1° la ruta absoluta desde donde se inició el proceso de node,
// 2° ruta absoluta del archivo que se está ejecutando (utils.js)
// y el argumento extra que sería el path
const data = [...process.argv];

// regex que encuentra todos los links de un archivo con sintaxis markdown.
const regexLinks = /\[([^\[]+)\](\(.*\))/gm ;

const extentionFile = (file) => {
	return path.extname(file)
}

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

const fileOrDirectory = (filePath) => {
	// verificaremos si la ruta es un archivo o directorio
	// fs.statSync nos devuelve un objeto con información acerca de la ruta
	// estaremos utilizando el método isDirectory
	const dta = fs.statSync(filePath);
	return dta.isDirectory()
}

let paths = [] ;
const extractingPaths = (filePath) => {
	if (!fileOrDirectory(filePath) && extentionFile(filePath) === '.md') {
		paths = paths.concat(filePath);
	} else if(fileOrDirectory(filePath)) {
		const contentDir = fs.readdirSync(filePath);
		contentDir.forEach((content) => {
			const fullPath = path.join(filePath, content);
			return !fileOrDirectory(fullPath) && extentionFile(fullPath) === '.md' ? paths.push(fullPath) : extractingLinks (fullPath);
		})
	} else {
		console.log('no existe archivo o directorio')
	}
	return paths;
}

// función para extraer los links de las rutas
const extractingLinks = (paths) => {
	let array = [];
	let oneMatch = /\[([^\[]+)\]\((.*)\)/;

	paths.map((path) => {
		const fileDta = fs.readFileSync(path, 'utf8');
		const arrLP = fileDta.match(regexLinks);
		const newArray = arrLP.map((e, i) => {
			let lineOfSintax = oneMatch.exec(arrLP[i])
			return {
				href: lineOfSintax[2],
				text: lineOfSintax[1],
				file: path
			}
		})
		array.push(newArray)
	})
	return array.flat();
}

// función para validar los links
const validateLinks = (arrayLinks) => {
	arrayLinks.map((linkObj) => {
		return axios.get(linkObj.href)
		.then(response => {
			arrayLinks = {
				...linkObj,
				status :  response.status ,
				ok : response.status >= 100 && response.status <= 199 ? response.status :
				response.status >= 200 && response.status <= 299 ? `ok` :
				response.status >= 300 && response.status <= 399 ? `redirección` :
				response.status >= 400 && response.status <= 499 ? `fail, error del cliente` :
				response.status >= 500 && response.status <= 599 ? `error en el servidor` :
				'something went wrong'
			}
			/* Respuestas informativas (100–199),
			Respuestas satisfactorias (200–299),
			Redirecciones (300–399),
			Errores de los clientes (400–499),
			y errores de los servidores (500–599).
			// console.log(e) */
		})
		.catch(error => {
			arrayLinks = {
				...linkObj,
				fail :  error.message ,
			}
			console.log(arrayLinks)
		});
	})
	return arrayLinks;
	// resolve all promise
	// promise.all
}

// console.log(validateLinks(extractingLinks(extractingPaths(data[2]))))
validateLinks(extractingLinks(extractingPaths(data[2])))

//mdLinks('archivo', {options}) 
module.exports = {
	extentionFile,
	thePathExist,
	isAFullPath,
	fileOrDirectory,
	extractingPaths,
	extractingLinks,
	validateLinks
}
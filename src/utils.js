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

const extentionFile = (file) => { return path.extname(file) }

// fs.existsSync verificamos si la ruta pasada existe o no
const thePathExist = (filePath) => { return fs.existsSync(filePath) }

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
		if(arrLP !== null){
			const newArray = arrLP.map((e, i) => {
				let lineOfSintax = oneMatch.exec(arrLP[i])
				return {
					href: lineOfSintax[2],
					text: lineOfSintax[1],
					file: path
				}
			})
			array.push(newArray)
		} else {
			return array;
		}
	})
	//console.log(array.flat().length)
	return array.flat();
}

// función para validar los links
const validateLinks = (arrayLinks) => {
	//console.log(arrayLinks)
	/* const links = arrayLinks.map((linkObj) => axios.get(linkObj.href))
	return Promise.allSettled(links)
	.then((responses) => {
		//console.log(responses.status)
		return responses.map(response => {
			//console.log(response)
			//return response.status === 'fulfilled' ? {}
			if(response.status === 'fulfilled'){
				console.log({
					status:  response.value.status,
					message: response.value.statusText
				})
				return {
					status:  response.value.status,
					message: response.value.statusText
				}
			} else if (response.status === 'rejected') {
				console.log({
					status:  response.status,
					message: 'FAIL'
				})
			}
		})
	
	}) */
	//Promise.allSettled se resuelve una vez que todas las promesas en el array sean resolve o reject
	return Promise.allSettled(arrayLinks.map(links => {
		return axios.get(links.href)
		.then((response) => {
			//actualizamos arrayLinks con status y message
			return arrayLinks = {
				...links,
				status : response.status ,
				message : response.status >= 100 && response.status <= 199 ? response.status :
				response.status >= 200 && response.status <= 299 ? response.statusText :
				response.status >= 300 && response.status <= 399 ? response.statusText :
				response.status >= 400 && response.status <= 499 ? response.statusText :
				response.status >= 500 && response.status <= 599 ? response.statusText :
				'something went wrong'
			}
		})
		.catch(() => {
			return arrayLinks = {
				...links,
				status: 'something went wrong',
				message :  'FAIL',
			}
		})
	}))
}

module.exports = {
	extentionFile,
	thePathExist,
	isAFullPath,
	fileOrDirectory,
	extractingPaths,
	extractingLinks,
	validateLinks
}
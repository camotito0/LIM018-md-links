//const process = require('process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// process.argv recibe argumentos en el proceso de node.js, en este caso guarda
// 1° la ruta absoluta desde donde se inició el proceso de node,
// 2° ruta absoluta del archivo que se está ejecutando (utils.js)
// y el argumento extra que sería el path
//const data = [...process.argv];

// regex que encuentra todos los links de un archivo con sintaxis markdown.
const regexLinks = /\[([^\[]+)\](\(.*\))/gm;

const extentionFile = (file) => path.extname(file);

// fs.existsSync verificamos si la ruta pasada existe o no
const thePathExist = (filePath) => fs.existsSync(filePath);

// path.isAbsolute ve si el path introducido es un 'fullpath' (ruta completa), retorna un booleano
// si no es así entonces con path resolve sacamos la ruta actual del documento y lo unimos con la ruta que nos pasan
const isAFullPath = (filePath) => path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

// verificaremos si la ruta es un archivo o directorio
// fs.statSync nos devuelve un objeto con información acerca de la ruta
// estaremos utilizando el método isDirectory
const fileOrDirectory = (filePath) => fs.statSync(filePath).isDirectory();

let paths = [] ;
const extractingPaths = (filePath) => {
	if (!fileOrDirectory(filePath) && extentionFile(filePath) === '.md') {
		paths = paths.concat(filePath);
	} else if(fileOrDirectory(filePath)) {
		const contentDir = fs.readdirSync(filePath);
		contentDir.forEach((content) => {
			const fullPath = path.join(filePath, content);
			return !fileOrDirectory(fullPath) && extentionFile(fullPath) === '.md' ? paths.push(fullPath) : prueba(fullPath);
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
	return array.flat();
}

// función para validar los links
const validateLinks = (arrayLinks) => {
	//Promise.allSettled se resuelve una vez que todas las promesas en el array sean resolve o reject
	return Promise.allSettled(arrayLinks.map(links => {
		return axios.get(links.href)
		.then((response) => {
			//actualizamos arrayLinks con status y message
			return arrayLinks = {
				...links,
				status : response.status ,
				message : 'OK'
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

const statsLinks = (arrayLinks) => {
	let stats = [];
	const totalLinks = arrayLinks.length;
	const uniqueLinks =	arrayLinks.map((link) => link.href).filter((v, i, a) => a.indexOf(v) === i);
	
	stats.total = totalLinks;
	stats.unique = uniqueLinks.length;
	return stats;
}

const validateLinksStats = (links) => {
	let stats = [];
	const brokenLinks = links.map((link) => link.value.message).filter((v) => v === 'FAIL');
	const uniqueLinks = links.map((link) => link.value.href).filter((v, i, a) => a.indexOf(v) === i);
	stats.total = links.length;
	stats.unique = uniqueLinks.length;
	stats.broken = brokenLinks.length;
	return stats;
}

module.exports = {
	extentionFile,
	thePathExist,
	isAFullPath,
	fileOrDirectory,
	extractingPaths,
	extractingLinks,
	validateLinks,
	statsLinks,
	validateLinksStats
}
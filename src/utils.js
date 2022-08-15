const process = require('process');
const fs = require('fs');
const path = require('path');

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

/* const readingFile = () => {
	// el segundo parametro es para el encode del archivo
	if(extentionFile(data[2]) === '.md'){
		const dta = fs.readFileSync(data[2], 'utf8')
		//console.log(fs.readFileSync(data[2], 'utf8'))
		console.log(matchLinks(dta).length);
	} else return console.log('error')
} */

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
	// estaremos utilizando los métodos isFile y isDirectory
	const dta = fs.statSync(filePath);
	return dta.isFile() ? filePath : dta.isDirectory() ? filePath : 'no existe el archivo';
}

const extractingLinks = (filePath) => {
	/* let arrayLinks;
	// si nos devuelve un filePath entonces podemos decir que es un archivo o directorio
	if(fileOrDirectory(filePath)) {
		// console.log('tenemos un filePath')
		// si la extensión del archivo es .md entonces procedemos a leer el documento
		if ( extentionFile(filePath) === '.md') {
			// arrayLinks.push(filePath)
			const fileDta = fs.readFileSync(filePath, 'utf8');
			arrayLinks = (fileDta.match(regexLinks));
			// arrayLinks.flat();
		} else {
			// tenemos que entrar al directorio
			// con fs.readdirSync entramos a la carpeta y este retorna un array con los archivos que contiene
			const files = fs.readdirSync(filePath);
			files.map((file) => {
				// path.join une dos o más rutas
				const fullPath = path.join(filePath, file);
				arrayLinks = extractingLinks(fullPath);
				//arrayLinks.flat();
			})
		}
	}
	console.log(extractingLinks(filePath))
	return arrayLinks; */
}

/* const links = (arrayPath) => {
	let array = [];
	arrayPath.forEach(path => {
		console.log(path)
		const fileDta = fs.readFileSync(path, 'utf8');
		// console.log(fileDta)
		array.concat(fileDta.match(regexLinks))
		console.log(fileDta.match(regexLinks))
	})
	console.log(typeof arrayPath)
}
 */
extractingLinks(data[2])
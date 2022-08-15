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
	/* if(dta.isFile()){ console.log(filePath); }
	else if(dta.isDirectory()){ console.log(filePath); }
	else { console.log('Error no such file or directory')} */
	// console.log( dta.isFile() === true ? 'nn' : dta.isDirectory() === true ? 'jjj' : 'Nono')
	//console.log(ab)
	/* if(dta.isFile()){
		console.log('sisi')
	} else {
		console.log(dta.isDirectory() ? filePath : 'nono')
	} */
}

const fileOrDirectory2 = (filePath) => {
	// si la extensión del archivo es .md entonces procedemos a leer el documento
	if(path.extname(filePath) === '.md'){
		// fs.readFileSync(ruta, 'encode') -> recibe dos paremetros
		const fileDta = fs.readFileSync(filePath, 'utf8');
		// tenemos que sacar todos los links existentes (lo haremos con regex)
		console.log(fileDta.match(regexLinks))
	} else {
		// tenemos que entrar al directorio
		// con fs.readdirSync entramos a la carpeta y este retorna un array con los archivos que contiene
		const files = fs.readdirSync(filePath);
		console.log(files)
		files.map((file) => {
			// aquí vendría la recursividad fr fileOrDirectory
			console.log(path.isAbsolute(file))
			//console.log(fileOrDirectory(file))
		})
		//console.log(fs.readFileSync(files, 'utf8'))
	}
}

fileOrDirectory(data[2]);
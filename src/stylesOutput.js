const chalk = require('chalk');

const colorInfo = chalk.hex('#f4afab');
const colorTitle = chalk.hex('#75dbcd');
const help = chalk.hex('#fec89a');
const nonCommand = chalk.hex('#ff7477');

const stylingOutputDefault = (arrayLinks) => {
console.log(colorTitle(`
        ──────────────────────────────────────────────────🌼◦∘
            LINKS ENCONTRADOS EN EL ARCHIVO/DIRECTORIO
        ∘◦🌼──────────────────────────────────────────────────\n`))
    arrayLinks.forEach((link) => {
        if('status' in link && 'message' in link){
            console.log(colorInfo(`
            🌼\tHREF:\t${link.href}\n 
            🌼\tTEXT:\t${link.text}\n
            🌼\tFILE:\t${link.file}\n
            🌼\tSTATUS:\t${link.status}\n
            🌼\tMESSAGE:\t${link.message}\n
            ────────────────────────────────  ❁  ────────────────────────────────
            `))
        } else {
            console.log(colorInfo(`
            🌼\tHREF:\t${link.href}\n 
            🌼\tTEXT:\t${link.text}\n
            🌼\tFILE:\t${link.file}\n
            ────────────────────────────────  ❁  ────────────────────────────────
            `))
        }
    })
}

const stylingOutputStats = (arrayStats) => {
    console.log(colorTitle(`
    ────────────────────────────────────────────────────────────────🌼◦∘
        ESTADÍSTICAS DE LOS LINKS ENCONTRADOS EN EL ARCHIVO/DIRECTORIO
    ∘◦🌼────────────────────────────────────────────────────────────────\n`))
    if(arrayStats.broken !== undefined) {
      return console.log(colorInfo(`
        🌼\tTOTAL:\t${arrayStats.total}\n 
        🌼\tUNIQUE:\t${arrayStats.unique}\n
        🌼\tBROKEN:\t${arrayStats.broken}\n
        `))
    } else {
       return console.log(colorInfo(`
        🌼\tTOTAL:\t${arrayStats.total}\n 
        🌼\tUNIQUE:\t${arrayStats.unique}\n
        `))
    }
}

const stylingOutputHelp = () => {
    console.log(help(`🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃\n
    ＯＰＴＩＯＮＳ\n
    🌼 --validate o --v
        * href: URL encontrada.
        * text: Texto que aparecía dentro del link.
        * file: Ruta del archivo donde se encontró el link.
        * status: Código de respuesta HTTP.
        * ok: Mensaje fail en caso de fallo u ok en caso de éxito.
    🌼 --stats o --s
        * Total: total de links encontrados.
        * Unique: total de links unicos encontrados.
    🌼 --stats --validate o --s --v
        * Total: total de links encontrados.
        * Unique: total de links unicos encontrados.
        * Broke: total de links rotos.\n
🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃    🍃`))
}

const stylingOutput = () => {
    console.log(nonCommand(`
    ──────────────────────────────────────────────────────────────── 😡 ◦∘
      Ingresa un archivo/carpeta a examinar o el comando mdLinks --help
    ∘◦ 😡 ────────────────────────────────────────────────────────────────\n
    `));
}


module.exports = { 
    stylingOutputDefault,
    stylingOutputStats,
    stylingOutputHelp,
    stylingOutput
}
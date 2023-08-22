// src - identificar archivo a compilar
// dest - (destination) lugar donde se va a guardar ó almacenar creando una carpeta en este caso 
//        llamada build/css
const { src, dest, watch, series, parallel} = require('gulp'); // exporta multiples funciones
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// postcss y autoprefixer es para que a compilar se genere codigo de ultima generacion
// y compatible  con diferentes buscadores los cuales escribes al final en el package.json
// "browserslist": ["last 1 version", "> 1%" ] --- con esto le dices todos los buscadores 
// que tienen segun "CAN I USE" más del 1% de uso y en su ultima version. 

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//----------------------------------------------------------------

// compilar sass
// pasos: 1 -identificar archivo, 2 - compilarla, 3 - Guardar el .css
function css(done) {
    src('src/scss/app.scss') //identifiar
        .pipe(sourcemaps.init())
        .pipe( sass() ) //compilar
        .pipe( postcss([ autoprefixer() ]) ) 
        .pipe( sourcemaps.write('.')) // el . para que se guarde en el build 
        .pipe( dest('build/css')) //guardar

    done(); //para que termine la compilacion
}

function imagenes() {
    return src('src/img/**/*') // --- * -Carga todos los archivos
        .pipe( imagemin({ optimizationLevel: 3 }))
        .pipe( dest('build/img'))  // En vez de usar done usamos return. Ambas son validas. 
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones))
        .pipe( dest('build/img')) //
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones))
        .pipe( dest('build/img'))
}

// el watch es para que se repita funcion css sin requerir estar compilando todas las veces
function dev (done) {
    watch('src/scss/**/*.scss', css); // -**-busca en la carpeta scss - *.scss -cualquier archivos que terminan scss.
    /* watch('src/scss/app.scss', css); */ // Para una ubicación en particular
    watch('src/img/**/*', imagenes); // Se integren y se vayan a build las nuevas imagenes
}

//----------------------------------------------------------------

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( css, dev ); //la que tiene el watch hasta el final porque esa detiene la ejecución
// 'imagenes, versionWebp, versionAvif,' los saque del default

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente.
// parallel - Todas inician al mismo tiempo

//----------------------------------------------------------------
// En los otros documentos (app.scss, y los que terminan en .scss):

//      @forward - archivos dentro de otros pero solo los incluye, no los usa.
//      @use ó @import - incluirlos y compilarlos. 
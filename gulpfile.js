// src - identificar archivo a compilar
// dest - (destination) lugar donde se va a guardar ó almacenar creando una carpeta en este caso 
//        llamada build/css
const { src, dest, watch, series, parallel} = require('gulp'); // exporta multiples funciones
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// postcss y autoprefixer es para que a compilar se genere codigo de ultima generacion
// y compatible  con diferentes buscadores los cuales escribes al final en el package.json
// "browserslist": ["last 1 version", "> 1%" ] --- con esto le dices todos los buscadores 
// que tienen segun "CAN I USE" más del 1% de uso y en su ultima version. 

//----------------------------------------------------------------

// compilar sass
// pasos: 1 -identificar archivo, 2 - compilarla, 3 - Guardar el .css
function css(done) {
    src('src/scss/app.scss') //identifiar
        .pipe( sass() ) //compilar
        .pipe( postcss([ autoprefixer() ]) ) 
        .pipe( dest('build/css')) //guardar

    done(); //para que termine la compilacion
}


// el watch es para que se repita funcion css sin requerir estar compilando todas las veces
function dev (done) {
    watch('src/scss/app.scss', css);
}

//----------------------------------------------------------------

exports.css = css;
exports.dev = dev;
exports.default = series( css, dev ); //la que tiene el watch hasta el final porque esa detiene la ejecución

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente.
// parallel - Todas inician al mismo tiempo
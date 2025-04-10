const { src, dest, series, parallel, watch } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const header = require("gulp-header");

// Configurações
const paths = {
  css: "css/style.css",
  js: "js/script.js",
  dist: "dist",
};

// Banner de identificação
const banner = `/* =============================================
 * Processado em: ${new Date().toLocaleString()}
 * ============================================= */\n`;

// Tarefas
function css() {
  return src(paths.css)
    .pipe(cleanCSS())
    .pipe(header(banner))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.dist + "/css"))
    .pipe(browserSync.stream());
}

function js() {
  return src(paths.js)
    .pipe(terser())
    .pipe(header(banner.replace("/*", "//")))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.dist + "/js"))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: "." });
  watch(paths.css, css);
  watch(paths.js, js);
  watch("*.html").on("change", browserSync.reload);
}

exports.default = series(parallel(css, js), serve);

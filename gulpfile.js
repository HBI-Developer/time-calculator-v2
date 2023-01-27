const { task, parallel, src, watch, dest, series } = require("gulp"),
  connect = require("gulp-connect"),
  order = require('gulp-order'),
  concat = require("gulp-concat"),
  maps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  sass = require("gulp-sass")(require('sass')),
  prefix = require("gulp-autoprefixer"),
  pug = require("gulp-pug"),
  typescript = require("gulp-typescript"),
  stripImport = require('gulp-strip-import-export'),
  images = require('gulp-imagemin'),
  notify = require('gulp-notify');

// // Connect

function serveTask(done) {
  connect.server(
    {
      root: "dist",
      livereload: true,
      port: 8000,
    },
    function () {
      this.server.on("close", done);
    }
  );
}

// // HTML

task("html", function () {
  return src("./public/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist"))
    .pipe(notify("العمليات على ملفات (Pug) قد انتهت!"));
});

//CSS

task('css', function () {
    return src(['public/stylesheets/general/*.css','public/stylesheets/libs/*.css', 'public/stylesheets/**/*.*'])
            .pipe(maps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(prefix('last 2 versions'))
            .pipe(concat('css/index.css'))
            .pipe(maps.write('.'))
            .pipe(dest('dist'))
            .pipe(notify("العمليات على ملفات (CSS) و(SASS) قد انتهت!"));
});

//JavaScript

task('js', function () {
    return src(['public/**/*.js', 'public/**/*.ts'])
            .pipe(maps.init())
            .pipe(typescript({
                allowJs: true,
                module: 'esnext',
                target: "esnext",
                allowSyntheticDefaultImports: true,
                moduleResolution: 'node'
            }))
            .pipe(order([
              'javascripts/libs/jQuery.js',
              'javascripts/libs/*.js',
              '**/*.js',
              'typescripts/variables.ts',
              '**/*.ts'
            ]))
            .pipe(concat('js/index.js'))
            .pipe(stripImport())
            .pipe(uglify())
            .pipe(maps.write('.'))
            .pipe(dest('dist'))
            .pipe(notify("العمليات على ملفات (JS) و(TS) قد انتهت!"));
});

// Images compressed

task('images', function () {
    return src('public/images/**/*.*')
            .pipe(images())
            .pipe(dest('dist/images'))
            .pipe(notify("العمليات على ملفات الصور قد انتهت!"));
});

// Others

task('fonts', function () {
  return src(['public/fonts/*.*'])
          .pipe(dest('dist/fonts'))
          .pipe(notify("العمليات على ملفات الخطوط قد انتهت!"));
});

// Watch

function watchTask(done) {
  watch("public/*.pug", series("html"));
  watch(['public/stylesheets/general/*.css', 'public/stylesheets/libs/*.css', 'public/stylesheets/**/*.*'], series("css"));
  watch(['public/javascripts/*.js', 'public/typescripts/*.ts'], series("js"));
  watch(['public/images/**/*.*'], series("images"));
  watch(['public/fonts/*.*'], series("fonts"));

  watch("dist").on("change", (filepath) =>
    src(filepath, { read: false }).pipe(connect.reload())
  );
  done();
}

module.exports.default = parallel(serveTask, watchTask);

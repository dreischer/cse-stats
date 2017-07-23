var gulp = require('gulp')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')
var gwebpack = require('gulp-webpack')
var less = require('gulp-less')
var rimraf = require('rimraf')

var srcPath = 'src/client'
var modulesPath = 'node_modules'
var distPath = 'dist'

function webpack (name, ext, watch) {
  var options = {
    watch: watch,
    cache: true,
    devtool: 'source-map',
    output: {
      filename: name + '.js',
      sourceMapFilename: '[file].map'
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      modulesDirectories: [modulesPath]
    },
    module: {
      loaders: [
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: [new RegExp(modulesPath)],
          loader: 'babel-loader'
        },
        {
          test: /\.(less|css)$/,
          loader: 'style-loader!css-loader'
        }
      ]
    }
  }

  return gulp.src(srcPath + '/' + name + '.' + ext).pipe(gwebpack(options)).pipe(gulp.dest(distPath))
}

function js (watch) {
  return webpack('client', 'jsx', watch)
}

gulp.task('js', function () {
  return js(false)
})

gulp.task('js-dev', function () {
  return js(true)
})

gulp.task('css', function () {
  return gulp
  .src(srcPath + '/assets/styles.less')
  .pipe(less({
    paths: [modulesPath]
  }))
  .pipe(gulp.dest(distPath))
})

gulp.task('copy', function () {
  var semanticPath = modulesPath + '/semantic-ui-css'

  gulp.src(srcPath + '/*.html').pipe(gulp.dest(distPath))
  gulp.src(srcPath + '/favicon.ico').pipe(gulp.dest(distPath))

  return gulp
    .src(semanticPath + '/themes/default/assets/**/*')
    .pipe(gulp.dest(distPath + '/themes/default/assets/'))
})

gulp.task('server', function () {
  var serverMain = 'src/server/server'

  return nodemon({
    script: serverMain,
    watch: [serverMain],
    // exec: 'DEBUG=server node',
    exec: 'node-inspector --port 9999 & node --debug',
    env: {
      PORT: process.env.PORT || 4000
    }
  })
})

// remove dist directory
gulp.task('clean', function () {
  return rimraf.sync(distPath)
})

gulp.task('watch', ['copy'], function () {
  livereload.listen()
  gulp.watch([distPath + '/**/*']).on('change', livereload.changed)
  gulp.watch([srcPath + '/**/*.less'], ['css'])
  return gulp.watch([srcPath + '/**/*.html'], ['copy'])
})

gulp.task('default', ['clean', 'copy', 'css', 'server', 'js-dev', 'watch'])
gulp.task('build', ['clean', 'copy', 'css', 'js'])

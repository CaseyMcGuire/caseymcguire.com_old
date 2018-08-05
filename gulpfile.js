const gulp = require('gulp');
const watch = require('gulp-watch');

//source: https://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
const sourceFolder = "./src/server/views";
const destinationFolder = "./dist/server/views";

gulp.task('watch-handlebars', () => {
  gulp.src(sourceFolder + '/**/*', {base: sourceFolder})
    .pipe(watch(sourceFolder, {base: sourceFolder}))
    .pipe(gulp.dest(destinationFolder));
});

gulp.task('copy-fonts', () => {
  gulp.src(["./src/client/assets/**/*"])
      .pipe(gulp.dest("./dist/public/assets"))
});
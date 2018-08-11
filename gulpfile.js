const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch-handlebars', () => {
  const sourceFolder = "./src/server/views";
  const destinationFolder = "./dist/server/views";
  watchFolder(sourceFolder, destinationFolder);
});

gulp.task('watch-assets', () => {
  const sourceFolder = "./src/client/assets";
  const destinationFolder = "./dist/public/assets";
  watchFolder(sourceFolder, destinationFolder);
});

//source: https://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
function watchFolder(sourceFolderPath, destinationFolderPath) {
  gulp.src([sourceFolderPath + "/**/*"], {base: sourceFolderPath})
    .pipe(watch(sourceFolderPath, {base: sourceFolderPath}))
    .pipe(gulp.dest(destinationFolderPath))
}
const gulp = require('gulp');
const watch = require('gulp-watch');

const viewSourceFolder = "./src/server/views";
const viewDestinationFolder = "./dist/server/views";
const assetSourceFolder = "./src/client/assets";
const assetDestinationFolder =  "./dist/public/assets";

gulp.task('watch-handlebars', () => {
  watchFolder(viewSourceFolder, viewDestinationFolder);
});

gulp.task('watch-assets', () => {
  watchFolder(assetSourceFolder, assetDestinationFolder);
});

//source: https://blog.andrewray.me/how-to-copy-only-changed-files-with-gulp/
function watchFolder(sourceFolderPath, destinationFolderPath) {
  gulp.src([sourceFolderPath + "/**/*"], {base: sourceFolderPath})
    .pipe(watch(sourceFolderPath, {base: sourceFolderPath}))
    .pipe(gulp.dest(destinationFolderPath))
}

gulp.task("copy-static-files", () => {
  gulp.src(viewSourceFolder + "/**/*")
    .pipe(gulp.dest(viewDestinationFolder));
  gulp.src(assetSourceFolder + "/**/*")
    .pipe(gulp.dest(assetDestinationFolder));
});
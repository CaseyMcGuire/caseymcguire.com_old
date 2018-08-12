const path = require('path');

module.exports = {
  entry: {
    home: './src/client/pages/Home.tsx',
    resume: './src/client/pages/Resume/Resume.tsx',
    projects: './src/client/pages/Projects/Projects.tsx',
    'posts.index': './src/client/pages/Posts/index/PostsIndexPage.tsx'
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public')
  }
};
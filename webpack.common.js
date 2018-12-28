const path = require('path');

module.exports = {
  entry: {
    home: './src/client/pages/Home/HomePage.tsx',
    resume: './src/client/pages/Resume/Resume.tsx',
    projects: './src/client/pages/Projects/Projects.tsx',
    'posts.index': './src/client/pages/Posts/Index/PostsIndexPage.tsx',
    'posts.new': './src/client/pages/Posts/New/NewPostPage.tsx',
    'posts.edit': './src/client/pages/Posts/Edit/EditPostPage.tsx',
    'posts.show': './src/client/pages/Posts/Show/SinglePostPage.tsx',
    'sessions.new': './src/client/pages/Auth/Sessions/LoginPage.tsx',
    'users.new': './src/client/pages/Auth/Users/SignUpPage.tsx',
    '403': './src/client/pages/Status/403/ForbiddenPage.tsx',
    '404': './src/client/pages/Status/404/NotFoundPage.tsx',
    '500': './src/client/pages/Status/500/InternalServerErrorPage.tsx'
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
  externals: {
    'sanitize-html' : 'sanitizeHtml'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public')
  }
};
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  watchOptions: {
    poll: true
  },
  watch: true,
  mode: 'development'
});
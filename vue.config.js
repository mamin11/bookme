const Dotenv = require('dotenv-webpack');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}

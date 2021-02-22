let publicPath = process.env.NODE_ENV === 'production' ? 'light-blue-vue-admin/' : '/';

module.exports = {
  publicPath,
  productionSourceMap: false,
  baseUrl: '0.0.0.0',
  devServer: {
    host: 'BrAT-Testes'
  }
};

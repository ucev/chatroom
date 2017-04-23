function buildConfig(env) {
  return require(`./configs/webpack.config.${env}.js`)(env);
}

module.exports = buildConfig;
module.exports = {
  babelrcRoots: ['.', 'packages/*'],
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 12 } }],
  ],
};

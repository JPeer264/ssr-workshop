module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }],
    '@loadable/babel-plugin',
  ],
};

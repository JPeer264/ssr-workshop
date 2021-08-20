module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // https://github.com/airbnb/javascript/blob/c5bee75b1b358a3749f1a6d38ee6fad73de28e29/packages/eslint-config-airbnb-base/rules/imports.js#L71
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'test/**', // tape, common npm pattern
        'tests/**', // also common npm pattern
        'spec/**', // mocha, rspec-like pattern
        '**/__tests__/**', // jest pattern
        '**/__e2e__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        'test.{ts,tsx}', // repos with a single test file
        'test-*.{ts,tsx}', // repos with multiple top-level test files
        '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.ts', // jest config
        '**/jest.setup.ts', // jest setup
        '**/vue.config.ts', // vue-cli config
        '**/webpack.config.ts', // webpack config
        '**/webpack.config.*.ts', // webpack config
        '**/rollup.config.ts', // rollup config
        '**/rollup.config.*.ts', // rollup config
        '**/gulpfile.ts', // gulp config
        '**/gulpfile.*.ts', // gulp config
        '**/Gruntfile{,.ts}', // grunt config
        '**/protractor.conf.ts', // protractor config
        '**/protractor.conf.*.ts', // protractor config
        '**/karma.conf.ts', // karma config
      ],
      optionalDependencies: false,
    }],

    // https://github.com/airbnb/javascript/blob/1eadb93e377da1e56c3f91f26610e5d0a00738a9/packages/eslint-config-airbnb-base/rules/style.js
    'no-underscore-dangle': ['error', {
      allow: [
        '__PRELOADED_DATA__',
      ],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    }],

    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': ['off'],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    // react 17
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};

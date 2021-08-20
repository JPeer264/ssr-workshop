require('dotenv-defaults/config');
require('ignore-styles');
require('@babel/register')({ extensions: ['.js', '.ts', '.tsx'] });
require('./ServerApp.tsx');

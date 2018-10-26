'use strict';

module.exports = {
  root: true,
  extends: [
    'mitmaro',
    'mitmaro/config/babel',
    'mitmaro/config/ecmascript-9',
    'mitmaro/config/react'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  settings: {
    react: {
      version: "16.4.2"
    }
  },
  rules: {
    indent: [
      'error',
      2,
      {SwitchCase: 1},
    ],
    'react/jsx-indent': [
      'error',
      2,
    ],
    'react/jsx-indent-props': [
      'error',
      2,
    ],
    'react/no-did-update-set-state': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 1
      }
    ],
  }
}

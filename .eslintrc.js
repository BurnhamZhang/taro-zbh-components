module.export = {
  extends: ['taro', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': ['off', { varsIgnorePattern: 'Taro' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-no-bind': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: './tsconfig.json'
  }
}

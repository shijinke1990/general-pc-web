module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-uses-react': 2,
    'react/prop-types': 0,
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    'build',
    'public',
    'temp',
    'temp-*',
    '*.js.map',
    '*.ts.map',
    '*.log',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    '*.sublime-project',
    '*.sublime-workspace',
    '*.tmp',
    '*.swp',
    '.*.swp',
  ],
};

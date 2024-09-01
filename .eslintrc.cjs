/* eslint-disable prettier/prettier */
// Notice: you googled ESLint Prettier Typescript React, and ended up installing:
// - typescript
// - eslint
// - prettier
// - eslint-plugin-react
// - @typescript-eslint/eslint-plugin
// - @typescript-eslint/parser
// - eslint-plugin-import
// - eslint-import-resolver-typescript
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended', // comes from the eslint-plugin-react.
    'plugin:react/recommended', // comes from the eslint-plugin-react.
    'plugin:react/jsx-runtime', // comes from eslint-plugin-react. From the documentation: If you are using the new JSX transform from React 17, extend react/jsx-runtime in your eslint config (add "plugin:react/jsx-runtime" to "extends") to disable the relevant rules.
    'plugin:prettier/recommended', // this is the same as using prettier, only it adds a few rules.
  ],
  plugins: [
    'prettier', // <-- if you had used plugin:prettier/recommended this would have been enabled by default.
    'react',
    'import',
    '@typescript-eslint',
    'sort-exports',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    // detect solved the annoying warning of: "React version not specified in eslint-plugin-react settings"
    react: { version: 'detect' },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: { alwaysTryTypes: true, project: './jsconfig.json' } },
  },
  parserOptions: {
    ecmaVersion: 'latest', // Solved module not being recognized.
    sourceType: 'module', // Solved import & export not being recognized.
    ecmaFeatures: { jsx: true }, // Solved jsx files not being linted.
  },
  overrides: [
    // This is an example of how you can make overrides:
    {
      files: ['*.html'],
      excludedFiles: ['*.test.html', '*.cjs'],
      parser: 'html',
      rules: { quotes: ['error', 'single'] },
    },
  ],
  env: {
    node: true, // Solved 'XXX not being recognized'. XXX: module, require, process
    browser: true, // Solved window & document object not being recognized.
    jest: true, // Solved jest keywords like test & expect.
    es6: true, // Solved Promise is not defined.
  },
  rules: {
    // NOTE: This is where you can Override default settings coming from the plugins!

    // #########################
    // Rule Set 1: generic rules
    // #########################
    'no-debugger': 'warn', // default value is error. Disallow the use of the debugger keyword.
    'no-unused-vars': 'off', // Solved unused variables raising an error. Using @typescript-eslint/no-unused-vars instead.
    // '--max-warnings': -1, // default for build ignore warnings like 'setUserData' is assigned a value but never used
    'prefer-template': 'warn', // turns this: name + value, to `${name}${value}`
    // 'arrow-body-style': 'error', // Makes a return with one line a one-liner without a return. if you had used plugin:prettier/recommended this would have been enabled by default.
    // 'prefer-arrow-callback': 'off', // if you had used plugin:prettier/recommended this would have been enabled by default
    'no-constant-condition': 'off',
    // 'no-console': 'error', // Uncomment this if you want to disallow console logs, warns, or even errors.
    // 'no-duplicate-imports': 'error', // The rule "import/no-duplicates" has better performance (and can actually merge them and offer a fix!)

    // #######################
    // Rule Set 2: react rules
    // #######################
    'react/prop-types': 'off', // Solved the destructure of props error inside React elements
    'react/no-unescaped-entities': 'off', // Solved free texts paragraphs containing ' or "
    'react/jsx-uses-react': 'warn', // DO NOT USE if no-unused-vars is marked off! P.S. While this option is commented out here, it is uncommented on the app-frontend's eslint yaml file.
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'react/jsx-filename-extension': 'error', // Yells at you if a js file contains jsx syntax.
    // 'react/jsx-uses-vars': 'error', // DO NOT USE if no-unused-vars is marked off!

    // ############################
    // Rule Set 3: typescript rules
    // ############################
    '@typescript-eslint/no-unused-vars': 'warn',

    // ########################
    // Rule Set 4: import rules
    // ########################
    'import/no-duplicates': 'warn', // merges when two import lines import from the same file!
    'import/no-unresolved': 'warn', // Turns on errors for missing imports. # import/no-unresolved: [2, { commonjs: true, amd: true }] // This rules catches unresolved imports, but you don't need it since typescript also catches unresolved imports.
    'import/newline-after-import': 'warn', // must use a newline between all imports and next line of code.
    'import/first': 'warn', // I want the imports to be the first thing to appear in every file.
    'import/exports-last': 'warn', // Ensure all exports appear after other statements.
    'import/extensions': ['warn', 'never', { js: 'always' }],
    // - about import/extensions = Ensures consistent use of file extension on import path. it also had "'always', { ignorePackages: true }", which made internal packages fail at runtime if I enable this (api-gateway is an example case).
    // 'import/prefer-default-export': 'error', // Uncomment this if you only want to see export default and to disallow export { someVariable }.
    // 'import/newline-after-import': 'error', // Always make sure there's a new line after the last import statement.
    // 'import/named': 'error', // When you import { servicename } from './A.js' but A doesn't contain an export { servicename }, you'll get a servicename not found in './A.js' eslint (import/named). I disabled this, because I get the same effect from typescript.
    // 'import/default': 'error', // Ensures that a default export is present, given a default import. I disabled this, because typescript gives me the same effect.
    // 'import/export': 'error', // Report any invalid exports, i.e. re-export of the same name. I disabled this, because typescript gives me the same effect.

    // ##########################
    // Rule Set 5: prettier rules
    // ##########################
    'prettier/prettier': [
      // if you had used plugin:prettier/recommended this would have been enabled by default
      'warn',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
        jsxBracketSameLine: false,
        bracketSpacing: true,
        arrowParens: 'always',
        parser: 'typescript',
        endOfLine: 'auto',
        printWidth: 120,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        embeddedLanguageFormatting: 'off',
        quoteProps: 'as-needed',
      },
      { parser: 'typescript' },
    ],

    // ##############################
    // Rule Set 6: sort-imports rules
    // ##############################
    'sort-imports': [
      'error',
      {
        ignoreCase: false, // set to false, because I want UPPERCASE letters up and lowercase letters down.
        ignoreDeclarationSort: true, // set to true, because import order is handled by the import/order rule.
        ignoreMemberSort: false, // set to false, because this is the rules that allows for inner sorting!
        memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        allowSeparatedGroups: false, // When true, the rule only checks the sorting of imports that appear on consecutive lines.
      },
    ],

    // ##############################
    // Rule Set 7: sort-exports rules
    // ##############################
    // NOTE: Comes from the plugin eslint-plugin-sort-exports.
    'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],
  },
};

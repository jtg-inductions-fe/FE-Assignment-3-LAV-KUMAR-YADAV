import globals from 'globals';

import js from '@eslint/js';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';

import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist', 'src/components/ui']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            eslintPluginPrettierRecommended,
        ],
        languageOptions: {
            globals: globals.browser,
            /* Specify JSX parsing option for ESLint */
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react,
            'jsx-a11y': jsxA11y,
            'simple-import-sort': simpleImportSort,
            import: importPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            'react/react-in-jsx-scope': 'off',
            'no-console': 'error',
            'no-shadow': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // TODO: Update the groups as per the requirement.
                        ['^react$', '^react-dom'],
                        ['^\\w'],
                        [
                            '^@(?:|assets|components|constant|layout|routes|theme)',
                        ],
                        ['^\\./', '^\\.\\./'],
                    ],
                },
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],
            'arrow-body-style': ['error', 'as-needed'],
            'import/no-cycle': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
            'unused-imports/no-unused-imports': 'error',
        },
        /* Specify React version for eslint-plugin-react */
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                'eslint-import-resolver-custom-alias': {
                    alias: {
                        '@/*': './src/*',
                    },
                    extensions: ['.ts', '.tsx'],
                },
            },
        },
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        rules: {
            'import/no-default-export': 'error',
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return',
                },
            ],
        },
    },
]);

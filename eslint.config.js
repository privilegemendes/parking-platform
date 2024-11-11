// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import optimizeImports from "prettier-plugin-organize-imports";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default tseslint
  .config(
    { ignores: ["dist"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        "prettier-plugin-organize-imports": optimizeImports,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    }
  )
  .concat(eslintPluginPrettier);

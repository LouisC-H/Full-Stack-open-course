import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      eqeqeq: "error",
      "no-console": "off",
    },
  },
  {
    ignores: ["dist/**", "requests/**"],
  },
];

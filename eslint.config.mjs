import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    files: ["Src/**/*.js", "Controllers/**/*.js", "Routes/**/*.js", "Models/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error"
    }
  }
];

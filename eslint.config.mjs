import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    files: [
      "**/*.js",               
      "Configuracion/**/*.js",
      "Controllers/**/*.js",
      "Models/**/*.js",
      "Routes/**/*.js",
      "Src/**/*.js",
      "Test/**/*.js"
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        // Node
        require: "readonly",
        module: "readonly",
        console: "readonly",

        // Jest
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly"
      }
    },

    rules: {
      // 🟥 Errores Serios
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-redeclare": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-unreachable": "error",
      "no-unsafe-negation": "error",
      "no-func-assign": "error",
      "no-const-assign": "error",
      "no-control-regex": "error",

      // 🟧 Problemas lógicos
      "eqeqeq": "error",
      "curly": "error",              // obliga a usar llaves
      "no-fallthrough": "error",     // evita bugs en switch
      "no-extra-boolean-cast": "error",
      "no-implicit-globals": "error",

      // 🟨 Calidad
      "no-empty": "warn",
      "no-multi-spaces": "warn",
      "no-lonely-if": "warn",
      "no-shadow": "warn",           // variables que tapan otras
      "no-unused-expressions": "warn",
      "no-useless-return": "warn",
      "no-useless-catch": "warn",
      "no-useless-concat": "warn",
      "no-useless-escape": "warn",

      // 🟩 Node.js
      "callback-return": "warn",
      "global-require": "warn",
      "handle-callback-err": "warn",

      // 🍃 Estilo (puedes endurecer más si quieres)
      "no-trailing-spaces": "warn",
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"]
    }
  }
];

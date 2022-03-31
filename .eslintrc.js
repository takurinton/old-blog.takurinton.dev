module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "@takurinton/limit-import-scope"],
  rules: {
    "@takurinton/limit-import-scope/": [
      "error",
      {
        patterns: ["shared", "components", "./**"],
      },
    ],
  },
};

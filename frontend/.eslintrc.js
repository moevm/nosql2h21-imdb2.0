module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".jsx", ".js", ".tsx", ".ts"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};

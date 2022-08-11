module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "off",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "no-nested-ternary": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" },
    ],
    "react/require-default-props": "off",
    curly: ["error", "multi"],
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-no-useless-fragment": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ["*.stories.js", "*.stories.jsx", "*.stories.ts", "*.stories.tsx"],
      rules: {
        "react/jsx-props-no-spreading": "off",
      },
    },
  ],
};

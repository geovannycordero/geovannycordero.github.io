module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // React 17 specific rules
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",

    // Next.js specific
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",

    // General code quality
    "prefer-const": "error",
    "no-var": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // Accessibility
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
  },
  settings: {
    react: {
      version: "17.0.2",
    },
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
}

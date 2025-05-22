module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
    },
  ],
  rules: {
    "prettier/prettier": "error",
  },
};

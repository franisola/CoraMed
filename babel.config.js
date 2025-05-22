module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@": "./src",
            "@app": "./src/App",
            "@assets": "./assets",
            "@config": "./src/config",
            "@i18n": "./src/config/i18n",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@networking": "./src/networking",
            "@themes": "./src/themes",
            "@redux": "./src/redux",
            "@components": "./src/ui/components",
            "@screens": "./src/ui/screens",
            "@validations": "./src/validations",
          },
        },
      ],
    ],
  };
};

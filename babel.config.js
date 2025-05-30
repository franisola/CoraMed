export default function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
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
            "@slices": "./src/redux/slices",
            "@components": "./src/ui/components",
            "@screens": "./src/ui/screens",
            "@validations": "./src/validations",
            "@api": "./src/api",
            "@models": "./src/models",
          }
        }
      ]
    ]
  };
}
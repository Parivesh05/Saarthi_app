module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@types": "./src/types",
            "@store": "./src/store",
            "@config": "./src/config"
          }
        }
      ]
    ]
  };
};

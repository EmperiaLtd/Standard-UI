const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { exec } = require('child_process');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  var isEnvProduction = false;
  exec('git symbolic-ref --short HEAD', (err, stdout, stderr) => {
    if (err) {
      console.error("Could not understand the branch name.")
      return;
    }
    if (typeof stdout === 'string' && (stdout.trim() === 'Production')) {
      isEnvProduction = true;
    }
});
  config.module.rules.push(
    {
      test: /\.html$/i,
      loader: "html-loader",
      options: {
        sources: false,
      }
    }
  );
  if (isEnvProduction) {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, "src/service-worker.js"),
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [
          /\.map$/,
          /asset-manifest\.json$/,
          /LICENSE/,
          /\.js\.gz$/,
          /(apple-touch-startup-image|chrome-icon|apple-touch-icon).*\.png$/,
        ],
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024
      })
    );

  }
  return config;
};

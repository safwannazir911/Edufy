module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/, // possible image files
        use: ["file-loader"],
      },
    ],
  },
};

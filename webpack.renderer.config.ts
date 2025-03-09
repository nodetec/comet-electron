import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

// Filter out any existing CSS rules
const filteredRules = rules.filter(
  (rule) =>
    !(
      rule &&
      typeof rule === "object" &&
      rule.test &&
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      String(rule.test).includes("\\.css")
    )
);

// Add our CSS rule
filteredRules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" },
  ],
});

export const rendererConfig: Configuration = {
  module: {
    rules: filteredRules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
};

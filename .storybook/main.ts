import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                  importSource: "@emotion/react",
                },
              ],
              "@babel/preset-typescript",
            ],
            plugins: ["@emotion/babel-plugin"],
          },
        },
      ],
    });
    return config;
  },
};
export default config;
//https://olaf-go.medium.com/emotion-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-46def487d0b3

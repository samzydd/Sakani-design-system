import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  // Without this, Storybook never serves this project's public/ at all and
  // falls back to its own bundled default favicon (Storybook's own pink
  // mark) -- so the tab icon on the published Storybook (linked directly
  // from the docs site header) was never this project's brand, it was
  // always the tool's.
  "staticDirs": ["../public"]
};
export default config;
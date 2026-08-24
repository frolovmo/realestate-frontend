import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "./searchBar";

const meta: Meta<typeof SearchBar> = {
  title: "components/SearchBar",
  component: SearchBar,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {},
};

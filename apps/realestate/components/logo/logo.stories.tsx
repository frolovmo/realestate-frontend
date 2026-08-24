import type { Meta, StoryObj } from "@storybook/react";

import Logo from "./logo";

const meta: Meta<typeof Logo> = {
  title: "components/Logo",
  component: Logo,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};

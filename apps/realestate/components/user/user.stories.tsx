import type { Meta, StoryObj } from "@storybook/react";

import User from "./user";

const meta: Meta<typeof User> = {
  title: "components/User",
  component: User,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {},
};

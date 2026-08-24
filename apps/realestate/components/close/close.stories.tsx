import type { Meta, StoryObj } from "@storybook/react";

import Close from "./close";

const meta: Meta<typeof Close> = {
  title: "components/ui/Close",
  component: Close,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Close>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";

import { SelectDemo } from "./select";

const meta: Meta<typeof SelectDemo> = {
  title: "components/Select",
  component: SelectDemo,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Default: Story = {
  args: {},
};

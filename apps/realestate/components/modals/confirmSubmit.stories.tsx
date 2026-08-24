import type { Meta, StoryObj } from "@storybook/react";

import ConfirmSubmit from "./confirmSubmit";

const meta: Meta<typeof ConfirmSubmit> = {
  title: "components/ConfirmSubmit",
  component: ConfirmSubmit,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmSubmit>;

export const Default: Story = {
  args: {},
};

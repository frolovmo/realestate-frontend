import type { Meta, StoryObj } from "@storybook/react";

import Support from "./support";

const meta: Meta<typeof Support> = {
  title: "components/Support",
  component: Support,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Support>;

export const Default: Story = {
  args: {},
};

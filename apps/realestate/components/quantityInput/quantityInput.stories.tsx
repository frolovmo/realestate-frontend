import type { Meta, StoryObj } from "@storybook/react";

import QuantityInput from "./quantityInput";

const meta: Meta<typeof QuantityInput> = {
  title: "components/QuantityInput",
  component: QuantityInput,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof QuantityInput>;

export const Default: Story = {
  args: {},
};

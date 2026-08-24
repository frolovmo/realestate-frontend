import type { Meta, StoryObj } from "@storybook/react";

import SuccessFormSubmit from "./successFormSubmit";

const meta: Meta<typeof SuccessFormSubmit> = {
  title: "components/SuccessFormSubmit",
  component: SuccessFormSubmit,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SuccessFormSubmit>;

export const Default: Story = {
  args: {},
};

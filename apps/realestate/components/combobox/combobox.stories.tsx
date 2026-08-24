import type { Meta, StoryObj } from "@storybook/react";

import { ComboboxDemo } from "./comboboxDemo";

const meta: Meta<typeof ComboboxDemo> = {
  title: "components/Combobox",
  component: ComboboxDemo,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ComboboxDemo>;

export const Default: Story = {
  args: {},
};

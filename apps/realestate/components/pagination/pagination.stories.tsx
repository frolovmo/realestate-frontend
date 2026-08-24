import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "components/Pagination",
  component: Pagination,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
};

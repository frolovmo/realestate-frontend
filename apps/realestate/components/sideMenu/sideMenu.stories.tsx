import type { Meta, StoryObj } from "@storybook/react";

import SideMenu from "./sideMenu";

const meta: Meta<typeof SideMenu> = {
  title: "components/SideMenu",
  component: SideMenu,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {},
};

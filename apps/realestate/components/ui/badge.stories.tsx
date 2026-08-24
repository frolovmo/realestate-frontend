import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "components/ui/Badge",
  component: Badge,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Active: Story = {
  args: {
    variant: "primary",
    children: "Active",
  },
};

export const Draft: Story = {
  args: {
    variant: "default",
    children: "Draft",
  },
};

export const Pending: Story = {
  args: {
    variant: "secondary",
    children: "Pending",
  },
};

export const OnHold: Story = {
  args: {
    variant: "tertiary",
    children: "On-hold",
  },
};

export const Rejected: Story = {
  args: {
    variant: "destructive",
    children: "Rejected",
  },
};

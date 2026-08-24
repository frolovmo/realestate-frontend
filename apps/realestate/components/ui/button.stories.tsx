import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

import { action } from "@storybook/addon-actions";
import { PlusIcon } from "../icons";

const meta: Meta<typeof Button> = {
  title: "components/ui/Button",
  component: Button,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      description: "Button variants",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      description: "button sizes",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    onClick: action("default click"),
    children: "Submit",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    disabled: false,
    onClick: action("default click"),
    children: "Outline button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    disabled: false,
    onClick: action("default click"),
    children: "Secondary button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    onClick: action("default click"),
    children: (
      <div className="flex items-center justify-between">
        <PlusIcon className="mr-2 text-white" /> Add Property
      </div>
    ),
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import UploadModal from "./uploadModal";

const meta: Meta<typeof UploadModal> = {
  title: "components/UploadModal",
  component: UploadModal,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UploadModal>;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/react";

import UploadThumbnail from "./uploadThumbnail";

const meta: Meta<typeof UploadThumbnail> = {
  title: "components/UploadThumbnail",
  component: UploadThumbnail,
  tags: ["autodocks"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UploadThumbnail>;

export const Default: Story = {
  args: {},
};

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "positive",
    children: "Positive",
  },
  render: (args) => <Badge {...args} />,
};

export const AllBadges: Story = {
  args: {
    status: "positive",
    children: "Positive",
  },
  render: ({ ...args }) => (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Badge status="positive">Positive</Badge>
      <Badge status="negative">Negative</Badge>
      <Badge status="neutral">Neutral</Badge>
      <Badge status="error">Error</Badge>
      <Badge status="warning">Warning</Badge>
      <Badge status="positive">
        <Icon icon={"bell"} />
        with icon
      </Badge>
    </div>
  ),
};

export const Positive: Story = {
  args: {
    status: "positive",
    children: "Positive",
  },
};

export const Negative: Story = {
  args: {
    status: "negative",
    children: "Negative",
  },
};
export const Warning: Story = {
  args: {
    status: "warning",
    children: "Warning",
  },
};

export const Neutral: Story = {
  args: {
    status: "neutral",
    children: "Neutral",
  },
};

export const Error: Story = {
  args: {
    status: "error",
    children: "Error",
  },
};

export const WithIcon: Story = {
  args: {
    status: "warning",
    children: (
      <>
        <Icon icon="check" />
        with icon
      </>
    ),
  },
  name: "with icon",
  render: (args) => <Badge {...args} />,
};

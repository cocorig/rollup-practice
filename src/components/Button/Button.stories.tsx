import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Button } from ".";
import React from "react";

import { Icon } from "../Icon";
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    appearance: {
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["small", "medium"],
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    appearance: "primary",
    size: "medium",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    appearance: "secondary",
    size: "medium",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};

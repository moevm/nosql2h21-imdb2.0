import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./antd.scss";
import Header from "components/Header";
import { IProps } from "components/Header/Header";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Example/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: IProps) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: "light",
};

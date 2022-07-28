import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Test } from ".";

export default {
  title: "components/Test",
  component: Test,
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Default = Template.bind({});
Default.args = {};

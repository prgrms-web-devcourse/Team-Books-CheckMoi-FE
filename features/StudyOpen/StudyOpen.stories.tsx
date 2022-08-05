import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyOpen } from ".";

export default {
  title: "features/StudyOpen",
  component: StudyOpen,
  argTypes: {},
} as ComponentMeta<typeof StudyOpen>;

const Template: ComponentStory<typeof StudyOpen> = (args) => {
  return <StudyOpen {...args} />;
};

export const Default = Template.bind({});

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyState } from ".";

export default {
  title: "components/StudyState",
  component: StudyState,
} as ComponentMeta<typeof StudyState>;

const Template: ComponentStory<typeof StudyState> = (args) => (
  <StudyState {...args} />
);

export const Default = Template.bind({});
Default.args = {
  studyState: "gathering",
};

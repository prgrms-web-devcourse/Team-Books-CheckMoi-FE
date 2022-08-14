import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ApplicantList } from ".";

export default {
  title: "Components/ApplicantList",
  component: ApplicantList,
} as ComponentMeta<typeof ApplicantList>;

const Template: ComponentStory<typeof ApplicantList> = (args) => (
  <ApplicantList {...args} />
);

export const Default = Template.bind({});
Default.args = {};

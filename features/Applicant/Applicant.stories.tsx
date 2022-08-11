import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Applicant } from ".";

export default {
  title: "components/Applicant",
  component: Applicant,
} as ComponentMeta<typeof Applicant>;

const Template: ComponentStory<typeof Applicant> = (args) => (
  <Applicant {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Dummy",
  image: "https://picsum.photos/200",
  temperature: 36.5,
};

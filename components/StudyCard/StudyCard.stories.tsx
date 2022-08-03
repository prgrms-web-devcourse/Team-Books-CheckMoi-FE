import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyCard } from ".";

export default {
  title: "Components/StudyCard",
  component: StudyCard,
  argTypes: {},
} as ComponentMeta<typeof StudyCard>;

const Template: ComponentStory<typeof StudyCard> = (args) => {
  return <StudyCard {...args} />;
};

export const Default = Template.bind({});

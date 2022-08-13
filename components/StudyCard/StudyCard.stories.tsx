import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyCard, StudyCardSkeleton } from ".";

export default {
  title: "Components/StudyCard",
  component: StudyCard,
  argTypes: {},
} as ComponentMeta<typeof StudyCard>;

const Template: ComponentStory<typeof StudyCard> = (args) => {
  return <StudyCard {...args} />;
};

export const Default = Template.bind({});

const SkeletonTemplate: ComponentStory<typeof StudyCardSkeleton> = (args) => {
  return <StudyCardSkeleton {...args} />;
};
export const Skeleton = SkeletonTemplate.bind({});

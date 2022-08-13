import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookDetail, BookDetailSkeleton } from ".";

export default {
  title: "components/BookDetail",
  component: BookDetail,
} as ComponentMeta<typeof BookDetail>;

const Template: ComponentStory<typeof BookDetail> = (args) => (
  <BookDetail {...args} />
);

export const Default = Template.bind({});
Default.args = {};

const SkeletonTemplate: ComponentStory<typeof BookDetailSkeleton> = (args) => (
  <BookDetailSkeleton {...args} />
);

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};

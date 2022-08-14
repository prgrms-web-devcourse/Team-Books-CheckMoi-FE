import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Comment, CommentSkeleton } from ".";

export default {
  title: "components/Comment",
  component: Comment,
} as ComponentMeta<typeof Comment>;

const SkeletonTemplate: ComponentStory<typeof CommentSkeleton> = (args) => (
  <CommentSkeleton {...args} />
);

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};

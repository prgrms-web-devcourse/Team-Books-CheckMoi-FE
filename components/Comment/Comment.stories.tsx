import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Comment, CommentSkeleton } from ".";

export default {
  title: "components/Comment",
  component: Comment,
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => (
  <Comment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    id: "TestUser",
    name: "user",
    email: "test@naver.com",
    image: "https://picsum.photos/200",
    temperature: 36.5,
  },
  content: " Lorem ipsum dolor sit ",
};

const SkeletonTemplate: ComponentStory<typeof CommentSkeleton> = (args) => (
  <CommentSkeleton {...args} />
);

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};

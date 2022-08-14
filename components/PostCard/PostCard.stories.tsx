import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCard, PostCardSkeleton } from ".";

export default {
  title: "components/PostCard",
  component: PostCard,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => (
  <PostCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    id: 1,
    title: "This is Title!!~",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem, error optio atque sed eaque possimus nihil, delectus incidunt minus porro iusto laboriosam illum est rem enim dolore suscipit rerum?",
    category: "GENERAL",
    studyId: 1,
    writerId: 1,
    writer: "test",
    writerImage: "https://via.placeholder.com/300.png",
    commentCount: 3,
    createdAt: "2022/08/05",
    updatedAt: "2022/08/10",
  },
};

const SkeletonTemplate: ComponentStory<typeof PostCardSkeleton> = () => (
  <PostCardSkeleton />
);

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {};

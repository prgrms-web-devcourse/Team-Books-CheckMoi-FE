import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCard } from ".";

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
    id: "1",
    title: "This is Title!!~",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae voluptatem, error optio atque sed eaque possimus nihil, delectus incidunt minus porro iusto laboriosam illum est rem enim dolore suscipit rerum?",
    createdAt: "2022/08/05",
    comments: 10,
    size: 20,
    user: {
      userId: "asdasdsa@naver.com",
      name: "김민기",
      email: "asdasdsa@naver.com",
      img: "https://picsum.photos/200",
    },
    onClick: () => {
      console.log("Move PostDetail Page");
    },
  },
};

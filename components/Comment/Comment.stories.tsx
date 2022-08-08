import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Comment } from ".";

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
    userId: "TestUser",
    name: "user",
    email: "test@naver.com",
    img: "https://picsum.photos/200",
  },
  content: " Lorem ipsum dolor sit ",
};
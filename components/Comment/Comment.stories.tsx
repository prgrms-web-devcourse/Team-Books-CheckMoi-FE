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
    id: "TestUser",
    name: "user",
    email: "test@naver.com",
    image: "https://picsum.photos/200",
    temperature: 36.5,
  },
  content: " Lorem ipsum dolor sit ",
};

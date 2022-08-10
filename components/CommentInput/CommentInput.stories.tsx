import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentInput } from ".";

export default {
  title: "Components/CommentInput",
  component: CommentInput,
} as ComponentMeta<typeof CommentInput>;

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <CommentInput />
);

export const Default = Template.bind({});
Default.args = {};

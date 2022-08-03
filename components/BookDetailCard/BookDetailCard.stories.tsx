import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookDetail } from ".";

export default {
  title: "components/BookDetail",
  component: BookDetail,
} as ComponentMeta<typeof BookDetail>;

const Template: ComponentStory<typeof BookDetail> = (args) => <BookDetail {...args} />;

export const Default = Template.bind({});
Default.args = {};
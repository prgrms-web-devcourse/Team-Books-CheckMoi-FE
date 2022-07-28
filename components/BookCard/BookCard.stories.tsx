import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookCard } from ".";

export default {
  title: "components/BookCard",
  component: BookCard,
} as ComponentMeta<typeof BookCard>;

const Template: ComponentStory<typeof BookCard> = (args) => (
  <BookCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: "https://i.picsum.photos/id/962/200/300.jpg?hmac=wvuv8EVOoNE5J3sBkBx-1wcVHNbgJ_Z1dS98YhnShjM",
  title: "Hello",
  width: 10,
  height: 10,
};

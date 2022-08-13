import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BookCard, BookCardSkeleton } from ".";

export default {
  title: "components/BookCard",
  component: BookCard,
} as ComponentMeta<typeof BookCard>;

const Template: ComponentStory<typeof BookCard> = (args) => {
  return (
    <>
      <BookCard {...args} />
      <br />
      <BookCard {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  src: "https://i.picsum.photos/id/962/200/300.jpg?hmac=wvuv8EVOoNE5J3sBkBx-1wcVHNbgJ_Z1dS98YhnShjM",
  title: "Hello",
  size: 10,
};

const SkeletonTemplate: ComponentStory<typeof BookCardSkeleton> = (args) => {
  return (
    <>
      <BookCardSkeleton {...args} />
      <br />
      <BookCardSkeleton {...args} />
    </>
  );
};

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.args = {
  size: 10,
};

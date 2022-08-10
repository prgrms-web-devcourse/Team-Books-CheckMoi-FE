import styled from "@emotion/styled";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyOpen } from ".";

export default {
  title: "features/StudyOpen",
  component: StudyOpen,
  argTypes: {
    bookId: {
      defaultValue: 1,
    },
  },
} as ComponentMeta<typeof StudyOpen>;

const Template: ComponentStory<typeof StudyOpen> = (args) => {
  return <StudyOpen {...args} />;
};

export const Default = Template.bind({});

const Page = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;

const PageTemplate: ComponentStory<typeof StudyOpen> = (args) => {
  return (
    <Page>
      <StudyOpen {...args} />
    </Page>
  );
};

export const Paged = PageTemplate.bind({});

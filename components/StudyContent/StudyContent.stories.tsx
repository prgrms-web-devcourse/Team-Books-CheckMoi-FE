import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StudyContent } from '.';

export default {
  title: 'components/StudyContent',
  component: StudyContent,
} as ComponentMeta<typeof StudyContent>;

const Template: ComponentStory<typeof StudyContent> = (args) => (
  <StudyContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description: `스터디 소개
이러쿵저러쿵 솰라랴

aa

aa
a
a

솨랄랴랼


솨랄랴랼

솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
솨랄랴랼
v
아니 하자?`,
};

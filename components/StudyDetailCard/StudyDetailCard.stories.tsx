import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StudyDetailCard } from '.';

export default {
  title: 'components/StudyDetailCard',
  component: StudyDetailCard,
} as ComponentMeta<typeof StudyDetailCard>;

const Template: ComponentStory<typeof StudyDetailCard> = (args) => (
  <StudyDetailCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: '안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요',
  members: [
    {
      userId: 'string',
      name: 'string',
      email: 'string',
      img: 'https://picsum.photos/200',
    },
    {
      userId: 'string2',
      name: 'string',
      email: 'string',
      img: 'https://picsum.photos/200',
    },
    {
      userId: 'string3',
      name: 'string',
      email: 'string',
      img: 'string',
    },
  ],
};

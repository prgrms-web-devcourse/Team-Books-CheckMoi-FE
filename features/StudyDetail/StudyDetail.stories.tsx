import { ComponentStory, ComponentMeta } from '@storybook/react';
import {StudyDetail} from '.';

export default {
  title: 'features/StudyDetail',
  component: StudyDetail,
} as ComponentMeta<typeof StudyDetail>;

const Template: ComponentStory<typeof StudyDetail> = (args) => (
  <StudyDetail {...args} />
);

export const Default = Template.bind({});
Default.args = { };
 
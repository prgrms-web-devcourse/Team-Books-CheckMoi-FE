import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StudyDetailCard } from ".";

export default {
  title: "components/StudyDetailCard",
  component: StudyDetailCard,
} as ComponentMeta<typeof StudyDetailCard>;

const Template: ComponentStory<typeof StudyDetailCard> = (args) => (
  <StudyDetailCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  study: {
    id: "1",
    name: "안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요안녕하새요",
    thumbnail: "",
    currentParticipant: 1,
    maxParticipant: 16,
    gatherStartDate: "2021/01/01",
    gatherEndDate: "2022/02/02",
    studyStartDate: "2023/03/03",
    studyEndDate: "2024/04/04",
  },
  members: [
    {
      id: "string",
      name: "string",
      email: "string",
      image: "https://picsum.photos/200",
    },
    {
      id: "string2",
      name: "string",
      email: "string",
      image: "https://picsum.photos/200",
    },
    {
      id: "string3",
      name: "string",
      email: "string",
      image: "string",
    },
  ],
};

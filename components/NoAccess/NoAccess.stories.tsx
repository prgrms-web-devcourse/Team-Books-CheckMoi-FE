import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NoAccess } from ".";

export default {
  title: "Components/NoAccess",
  component: NoAccess,
} as ComponentMeta<typeof NoAccess>;

const Template: ComponentStory<typeof NoAccess> = (args) => (
  <NoAccess {...args} />
);

export const Default = Template.bind({});
Default.args = {};

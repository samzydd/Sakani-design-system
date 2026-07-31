import type { Meta, StoryObj } from '@storybook/react';
import { ChatInterfaceBlock } from './ChatInterfaceBlock';

const meta = {
  title: 'Templates/Chat Interface',
  component: ChatInterfaceBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'collapsed', 'empty'] },
  },
} satisfies Meta<typeof ChatInterfaceBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { state: 'default' } };
export const CollapsedSidebar: Story = { args: { state: 'collapsed' } };
export const NoConversation: Story = { args: { state: 'empty' } };
export const DarkMode: Story = {
  args: { state: 'default' },
  decorators: [(S) => (<div className="dark"><S /></div>)],
};


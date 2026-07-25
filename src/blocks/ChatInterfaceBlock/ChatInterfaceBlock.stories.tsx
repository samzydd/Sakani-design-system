import type { Meta, StoryObj } from '@storybook/react';
import { ChatInterfaceBlock } from './ChatInterfaceBlock';

const meta = {
  title: 'Blocks/Chat/Desktop Chat Interface',
  component: ChatInterfaceBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'collapsed', 'empty'] },
  },
} satisfies Meta<typeof ChatInterfaceBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Expanded navigation with a conversation open. */
export const Default: Story = { args: { state: 'default' } };
/** 64px icon rail; the main area reclaims the width. */
export const CollapsedSidebar: Story = { args: { state: 'collapsed' } };
/** Nothing selected — the conversation header row is hidden. */
export const NoConversation: Story = { args: { state: 'empty' } };

export const DarkMode: Story = {
  args: { state: 'default' },
  decorators: [(S) => (<div className="dark"><S /></div>)],
};

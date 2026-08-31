import type { Meta, StoryObj } from '@storybook/react';
import { ChatComposer } from './ChatComposer';

const meta = {
  title: 'Chat/Chat Composer',
  component: ChatComposer,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Message input for the chat thread. Matches the Figma "Chat Composer" set:

state (Figma "State" axis) -> default | typing | uploading | disabled

Attach + input + emoji + send. Typing shows a focus ring and an enabled
send; Uploading stacks an attachment row (with Progress) above the input;
Disabled covers read-only conversations.` } } },
  argTypes: { state: { control: 'select', options: ['default', 'typing', 'uploading', 'disabled'] } },
  args: { state: 'default', placeholder: 'Message Amara…' },
  decorators: [(S) => (<div style={{ width: 552 }}><S /></div>)],
} satisfies Meta<typeof ChatComposer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Typing: Story = { args: { state: 'typing', value: "Sounds good — I'll take a look this afternoon" } };
export const Uploading: Story = { args: { state: 'uploading', uploadName: 'flow-v3.fig', uploadProgress: 62 } };
export const Disabled: Story = { args: { state: 'disabled' } };
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24, width: 552 }}><S /></div>)],
};

import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Enter text…' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Label', description: 'Help text goes here.' } };
export const Filled: Story = { args: { label: 'Label', defaultValue: 'Entered text goes here. It can span multiple lines.' } };
export const Error: Story = { args: { label: 'Label', error: 'Help text goes here.' } };
export const Disabled: Story = { args: { label: 'Label', placeholder: 'Placeholder', disabled: true } };

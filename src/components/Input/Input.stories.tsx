import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { placeholder: 'Placeholder', size: 'md' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = {};
export const WithLabel: Story = { args: { label: 'Email address', placeholder: 'you@example.com' } };
export const WithDescription: Story = { args: { label: 'Email', description: 'We will never share your email.', placeholder: 'you@example.com' } };
export const Filled: Story = { args: { label: 'Email', defaultValue: 'sam@example.com' } };
export const Error: Story = { args: { label: 'Email', defaultValue: 'not-an-email', error: 'Enter a valid email address.' } };
export const Disabled: Story = { args: { label: 'Email', placeholder: 'Disabled', disabled: true } };
export const Small:  Story = { args: { size: 'sm', label: 'Small' } };
export const Large:  Story = { args: { size: 'lg', label: 'Large' } };

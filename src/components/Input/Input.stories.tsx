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
export const WithLabel: Story = { args: { label: 'Label', placeholder: 'Placeholder' } };
export const WithDescription: Story = { args: { label: 'Label', description: 'Help text goes here.', placeholder: 'Placeholder' } };
export const Filled: Story = { args: { label: 'Label', defaultValue: 'Input value' } };
export const Error: Story = { args: { label: 'Label', defaultValue: 'Input value', error: 'Help text goes here.' } };
export const Disabled: Story = { args: { label: 'Label', placeholder: 'Placeholder', disabled: true } };
export const Small:  Story = { args: { size: 'sm', label: 'Label', placeholder: 'Placeholder' } };
export const Large:  Story = { args: { size: 'lg', label: 'Label', placeholder: 'Placeholder' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input size="sm" label="Small"  placeholder="Placeholder" />
      <Input size="md" label="Medium" placeholder="Placeholder" />
      <Input size="lg" label="Large"  placeholder="Placeholder" />
    </div>
  ),
};

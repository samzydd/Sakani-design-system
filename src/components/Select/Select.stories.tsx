import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Nigeria', value: 'ng' },
  { label: 'Netherlands', value: 'nl' },
];

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { placeholder: 'Select option', options, size: 'md' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Label', description: 'Help text goes here.' } };
export const Filled: Story = { args: { label: 'Label', defaultValue: 'ng' } };
export const Error: Story = { args: { label: 'Label', error: 'Help text goes here.' } };
export const Disabled: Story = { args: { label: 'Label', disabled: true } };
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Select size="sm" label="Small"  placeholder="Select option" options={options} />
      <Select size="md" label="Medium" placeholder="Select option" options={options} />
      <Select size="lg" label="Large"  placeholder="Select option" options={options} />
    </div>
  ),
};

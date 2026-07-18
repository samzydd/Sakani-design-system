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
export const WithLabel: Story = { args: { label: 'Country', description: 'Where are you based?' } };
export const Filled: Story = { args: { label: 'Country', defaultValue: 'ng' } };
export const Error: Story = { args: { label: 'Country', error: 'Please select a country.' } };
export const Disabled: Story = { args: { label: 'Country', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

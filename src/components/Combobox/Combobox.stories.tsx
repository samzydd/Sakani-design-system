import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik', disabled: true },
];

const meta = {
  title: 'Composite/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'inline-radio', options: ['single', 'multi'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { options, mode: 'single', size: 'md', label: 'Framework', placeholder: 'Select a framework…' },
  decorators: [(S) => <div style={{ width: 320, minHeight: 320 }}><S /></div>],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Multi: Story = { args: { mode: 'multi', label: 'Frameworks', placeholder: 'Select frameworks…' } };
export const WithDescription: Story = { args: { description: 'Choose your primary framework.' } };
export const Error: Story = { args: { error: 'This field is required.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

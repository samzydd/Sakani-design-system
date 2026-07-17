import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { min: 0, max: 100, defaultValue: 50 },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Volume', showValue: true, defaultValue: 70 } };
export const Disabled: Story = { args: { label: 'Disabled', defaultValue: 30, disabled: true } };

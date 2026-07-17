import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Core/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Email address' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = { args: { children: 'Email address' } };
export const Required: Story = { args: { children: 'Email address', required: true } };

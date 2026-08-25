import type { Meta, StoryObj } from '@storybook/react';
import { ProgressItem } from './ProgressItem';

const meta = {
  title: 'Application/Progress Item',
  component: ProgressItem,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  args: { step: 1, title: 'Title', description: 'Description' },
} satisfies Meta<typeof ProgressItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Number: Story = {
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
};
export const Completed: Story = {
  args: { completed: true },
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
};
export const VerticalNumber: Story = { args: { orientation: 'vertical' } };
export const VerticalCompleted: Story = { args: { orientation: 'vertical', completed: true } };

export const HorizontalList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <ProgressItem step={1} title="Account details" description="Completed" completed />
      <ProgressItem step={2} title="Shipping address" description="In progress" />
      <ProgressItem step={3} title="Payment" description="Not started" isLast />
    </div>
  ),
};

export const VerticalList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ProgressItem orientation="vertical" step={1} title="Account details" description="Completed" completed />
      <ProgressItem orientation="vertical" step={2} title="Shipping address" description="In progress" />
      <ProgressItem orientation="vertical" step={3} title="Payment" description="Not started" isLast />
    </div>
  ),
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 280, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

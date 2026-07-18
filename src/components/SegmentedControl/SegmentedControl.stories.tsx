import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Composite/Segmented Control',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: { options: [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ], defaultValue: 'week' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Three: Story = {};
export const Two: Story = { args: { options: [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }], defaultValue: 'list' } };
export const Four: Story = { args: { options: ['All','Active','Draft','Archived'].map((l) => ({ value: l.toLowerCase(), label: l })), defaultValue: 'all' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

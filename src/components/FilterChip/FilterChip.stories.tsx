import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'Data/Filter Chip',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: { type: { control: 'inline-radio', options: ['default', 'active', 'add'] } },
  args: { children: 'Status', type: 'default' },
} satisfies Meta<typeof FilterChip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { type: 'active', children: 'Status: Active' } };
export const Add: Story = { args: { type: 'add', children: 'Add filter' } };
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <FilterChip type="active" onRemove={() => {}}>Status: Active</FilterChip>
      <FilterChip type="active" onRemove={() => {}}>Role: Admin</FilterChip>
      <FilterChip type="add">Add filter</FilterChip>
    </div>
  ),
};
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};

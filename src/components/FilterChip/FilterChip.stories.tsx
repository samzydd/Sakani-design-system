import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'Data/Filter Chip',
  component: FilterChip,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Toolbar filter pill. Matches the Figma "Filter Chip" set:

type (Figma "Type" axis) -> default | active | add

- default: label + chevron; opens a filter menu on click.
- active: applied value (strong label) on accent/subtle + remove (×).
- add: dashed outline + plus; appends a new filter.` } } },
  argTypes: { type: { control: 'inline-radio', options: ['default', 'active', 'add'] } },
  args: { children: 'Status', type: 'default' },
} satisfies Meta<typeof FilterChip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Removal is real here: a removed chip stays gone (until the page
 *  reloads), the same as it would in an app. A no-op onRemove would fade
 *  the chip out and then put it straight back. */
const RemovableRow: React.FC<{ initial: string[]; withAdd?: boolean }> = ({ initial, withAdd }) => {
  const [chips, setChips] = React.useState(initial);
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {chips.map((label) => (
        <FilterChip key={label} type="active" onRemove={() => setChips((c) => c.filter((x) => x !== label))}>
          {label}
        </FilterChip>
      ))}
      {withAdd && <FilterChip type="add">Add filter</FilterChip>}
    </div>
  );
};

export const Active: Story = {
  args: { type: 'active', children: 'Status: Active' },
  render: () => <RemovableRow initial={['Status: Active']} />,
};
export const Add: Story = { args: { type: 'add', children: 'Add filter' } };
export const Row: Story = {
  render: () => <RemovableRow initial={['Status: Active', 'Role: Admin']} withAdd />,
};
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};

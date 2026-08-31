import type { Meta, StoryObj } from '@storybook/react';
import { DataTableBlock } from './DataTableBlock';

const meta = {
  title: 'Blocks/Application/Data Table + Toolbar',
  component: DataTableBlock,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: swap the sample data for your own, change
the columns, add or remove toolbar controls. Everything here is assembled
from Sakani components — no new primitives.

Mirrors the six states in the Figma block:
- **default** — records loaded, no filters or selection
- **filtered** — search + filter chips applied
- **bulk** — rows selected; toolbar swaps for a bulk-actions bar
- **loading** — skeleton rows hold the layout
- **empty** — query returned nothing
- **error** — request failed, recovery offered

Layout: toolbar → Table → footer (count + Pagination).` } }, layout: 'fullscreen' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'filtered', 'bulk', 'loading', 'empty', 'error'],
    },
  },
} satisfies Meta<typeof DataTableBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Resting state: records loaded, no filters or selection applied. */
export const Default: Story = { args: { state: 'default' } };
/** Search and filter chips active; results reflect the applied filters. */
export const Filtered: Story = { args: { state: 'filtered' } };
/** Rows checked; the toolbar is replaced by a bulk-actions bar. */
export const BulkSelection: Story = { args: { state: 'bulk' } };
/** Skeleton rows hold the layout so nothing shifts when data arrives. */
export const Loading: Story = { args: { state: 'loading' } };
/** The query returned nothing — guidance, not an error. */
export const Empty: Story = { args: { state: 'empty' } };
/** The request failed; recovery offered via Retry. */
export const ErrorState: Story = { args: { state: 'error' } };

export const DarkMode: Story = {
  args: { state: 'default' },
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};

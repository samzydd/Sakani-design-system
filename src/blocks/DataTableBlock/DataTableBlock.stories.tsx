import type { Meta, StoryObj } from '@storybook/react';
import { DataTableBlock } from './DataTableBlock';

const meta = {
  title: 'Blocks/Application/Data Table + Toolbar',
  component: DataTableBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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

import type { Meta, StoryObj } from '@storybook/react';
import { ActivityLogBlock } from './ActivityLogBlock';

const meta = {
  title: 'Blocks/Application/Activity Log',
  component: ActivityLogBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly. Assembled from existing Sakani
components -- no new primitives:

Card shell (bg/surface, border/default, radius/xl) -> "Recent activity"
heading -> ActivityFeed

Mirrors the two states in the Figma block:
- **Timeline** — ActivityFeed's own "default" variant (icon rail)
- **Compact** — ActivityFeed's "compact" variant (avatar-led rows)` } } },
  argTypes: {
    state: {
      control: 'select',
      options: ['timeline', 'compact'],
    },
  },
} satisfies Meta<typeof ActivityLogBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Icon rail with a connector between dots. */
export const Timeline: Story = { args: { state: 'timeline' } };
/** Avatar-led single-line rows, timestamp right-aligned. */
export const Compact: Story = { args: { state: 'compact' } };

export const DarkMode: Story = {
  args: { state: 'timeline' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

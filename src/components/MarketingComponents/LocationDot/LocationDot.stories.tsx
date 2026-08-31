import type { Meta, StoryObj } from '@storybook/react';
import { LocationDot } from './LocationDot';

const meta = {
  title: 'Marketing/Location Dot',
  component: LocationDot,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Location Dot" (Marketing primitives set, shared across
any marketing component that shows a location -- JobListing is the
first consumer). 2 Status previews collapse into one derived-from-data
color, not a manual style prop: \`status\` directly drives the dot's
fill --
- **'active'** — success/solid (green) dot, e.g. a real office location ("Lagos, Nigeria").
- **'remote'** — fg/muted (gray) dot, matching the label text's own color exactly, e.g. "Remote — Worldwide".

Kept as its own exported component (unlike JobListing's earlier local
build of this exact markup) specifically so other marketing components
needing a location line can reuse it instead of re-implementing the
dot+label pattern -- the scalability concern that prompted breaking it
out here.` } } },
} satisfies Meta<typeof LocationDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: { location: 'Lagos, Nigeria', status: 'active' } };
export const Remote: Story = { args: { location: 'Remote — Worldwide', status: 'remote' } };

export const DarkMode: Story = {
  args: { location: 'Lagos, Nigeria', status: 'active' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

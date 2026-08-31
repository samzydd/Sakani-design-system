import type { Meta, StoryObj } from '@storybook/react';
import { Balance } from './Balance';

const meta = {
  title: 'Application/Balance',
  component: Balance,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Prominent balance display. Matches Figma "Balance" (4 style previews --
Default, Hidden, With Change, Progress -- collapsed here into composable
props rather than a single Figma-mirroring \`variant\` enum, since they're
genuinely independent pieces of the same widget, not mutually exclusive):

- label row: caption + a bare Eye/EyeOff icon (no button chrome, just a
contrast bump on hover) that masks the value
- big value (display/xl, 40px) -- masked as a random alphanumeric
string the same length as the real value, not dots
- optional change row: trend icon + colored delta (also masked when
hidden, rather than the whole row disappearing) + caption
- optional progress ring: shown beside the content when \`progress\` is set

The ring isn't a reuse of RadialChart -- its smallest preset is 180px vs.
the ~96px needed here, and its variants are either concentric rings or a
240° gauge, not this near-full ring-with-neutral-track. Recharts'
RadialBar \`background\` prop is built for exactly that pattern, so this is
a small dedicated chart, same call already made for the AvatarUpload
camera badge and ActivityFeed's rail connector.` } } },
  args: { value: '$24,582.30' },
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Hidden: Story = { args: { hidden: true } };
export const WithChange: Story = {
  args: { change: { value: '+$1,240.50' } },
};
export const WithChangeDown: Story = {
  args: { change: { value: '-$320.10', direction: 'down' } },
};
export const Progress: Story = {
  args: { change: { value: '+$1,240.50' }, progress: 65 },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
};
export const DarkMode: Story = {
  args: { change: { value: '+$1,240.50' } },
  decorators: [(S) => <div className="dark" style={{ width: 280, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStat } from './ProgressStat';

const meta = {
  title: 'Application/Progress Stat',
  component: ProgressStat,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Label + value row above a progress bar. Matches Figma "Progress Stat" --
its two style previews ("Percentage": "Profile completion" / "80%",
"Value": "Storage used" / "24 GB / 30 GB") turn out to be the exact same
structure with different sample data, not a real variant, so there's no
variant prop at all here: \`value\` is just whatever formatted string the
caller wants shown, and \`progress\` (0-100) drives the bar independently.

The bar reuses the existing Progress component (size="lg" matches
Figma's 8px track height, fill already binds to accent/default) rather
than a bespoke one, same reuse already made for Expenses -- accepting
its bg/subtle track over Figma's literal bg/canvas here for the same
reason: barely distinguishable off-whites, and Progress has no
style-override prop to fix it without gambling on CSS cascade order.` } } },
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
} satisfies Meta<typeof ProgressStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Percentage: Story = {
  args: { label: 'Profile completion', value: '80%', progress: 80 },
};
export const Value: Story = {
  args: { label: 'Storage used', value: '24 GB / 30 GB', progress: (24 / 30) * 100 },
};
export const DarkMode: Story = {
  args: { label: 'Profile completion', value: '80%', progress: 80 },
  decorators: [(S) => <div className="dark" style={{ width: 320, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

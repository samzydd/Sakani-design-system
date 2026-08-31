import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingProgressBlock } from './OnboardingProgressBlock';

const items = [
  { label: 'Complete your profile', progress: 100 },
  { label: 'Connect your bank account', progress: 50 },
  { label: 'Set up two-factor authentication', progress: 0 },
];

const meta = {
  title: 'Blocks/Application/Progress',
  component: OnboardingProgressBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Progress": "Onboarding progress" heading -> a stack of
label/percentage rows over bars. Each row is the existing ProgressStat
component reused directly (label-row + Progress bar is exactly its own
shape already) -- no new primitives here.

\`variant\` stays an explicit prop (not derived): "Default" wraps the rows
in a card with a heading, "Compact" is the bare stack with no card or
heading at all -- a real structural difference, same reasoning as
ActivityFeed's variant.` } } },
  args: { items },
} satisfies Meta<typeof OnboardingProgressBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
};

export const Compact: Story = {
  args: { variant: 'compact' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

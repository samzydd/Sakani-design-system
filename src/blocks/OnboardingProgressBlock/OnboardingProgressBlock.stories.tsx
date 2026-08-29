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

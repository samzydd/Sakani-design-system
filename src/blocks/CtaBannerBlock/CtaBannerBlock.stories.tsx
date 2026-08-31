import type { Meta, StoryObj } from '@storybook/react';
import { CtaBannerBlock } from './CtaBannerBlock';

const meta = {
  title: 'Blocks/Marketing/CTA Banner',
  component: CtaBannerBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CtaBannerBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  title: 'Ready to build faster?',
  description: 'Start with the free, open-source component library — no account required.',
  primaryAction: { label: 'Get started' },
  secondaryAction: { label: 'View on GitHub' },
  secondaryActionIcon: true,
};

export const Neutral: Story = { args: { ...args, variant: 'neutral' } };
export const Accent: Story = { args: { ...args, variant: 'accent' } };

export const DarkMode: Story = {
  args: { ...args, variant: 'neutral' },
  decorators: [(S) => <div className="dark"><S /></div>],
};

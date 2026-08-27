import type { Meta, StoryObj } from '@storybook/react';
import { InlineCtaBlock } from './InlineCtaBlock';

const meta = {
  title: 'Blocks/Application/Inline CTA',
  component: InlineCtaBlock,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent'] },
  },
  decorators: [(S) => <div style={{ width: 650 }}><S /></div>],
} satisfies Meta<typeof InlineCtaBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Unlock advanced analytics',
    description: 'Upgrade to Pro to see detailed usage trends and exports.',
    actionLabel: 'Upgrade',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    title: 'Free trial ends in 3 days',
    description: 'Add a payment method to keep access to Pro features.',
    actionLabel: 'Add payment method',
  },
};

export const DarkMode: Story = {
  args: Accent.args,
  decorators: [(S) => <div className="dark" style={{ width: 650, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

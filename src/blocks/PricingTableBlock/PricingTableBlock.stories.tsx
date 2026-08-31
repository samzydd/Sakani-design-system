import type { Meta, StoryObj } from '@storybook/react';
import { PricingTableBlock } from './PricingTableBlock';

const meta = {
  title: 'Blocks/Marketing/Pricing Table',
  component: PricingTableBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingTableBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  eyebrow: 'Pricing',
  title: 'Simple, transparent pricing',
  subtitle: 'Choose the plan that fits how your team builds.',
};

export const ThreeTiers: Story = {
  args: {
    ...args,
    plans: [
      {
        name: 'Starter',
        price: '$0',
        period: '/month',
        description: 'For solo builders exploring the system.',
        ctaLabel: 'Get started',
        features: ['Up to 3 projects', 'Core components', 'Community support', 'MIT license'],
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For teams shipping product.',
        ctaLabel: 'Start free trial',
        highlighted: true,
        features: ['Unlimited projects', 'All components & blocks', 'Priority support', 'Figma team library', 'Early access to new blocks'],
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For organizations with advanced needs.',
        ctaLabel: 'Contact sales',
        features: ['Everything in Pro', 'Dedicated support', 'Custom theming', 'SLA & security review', 'Onboarding assistance'],
      },
    ],
  },
};

export const TwoTiers: Story = {
  args: {
    ...args,
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'Get started with the essentials.',
        ctaLabel: 'Get started',
        features: ['Core components', 'Community support', 'MIT license'],
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'Unlock the full system.',
        ctaLabel: 'Start free trial',
        highlighted: true,
        features: ['All components & blocks', 'Priority support', 'Figma team library', 'Early access to new blocks'],
      },
    ],
  },
};

export const DarkMode: Story = {
  args: ThreeTiers.args,
  decorators: [(S) => <div className="dark"><S /></div>],
};

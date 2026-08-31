import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutSteps } from './CheckoutSteps';

const meta = {
  title: 'E-commerce/Checkout Steps',
  component: CheckoutSteps,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Checkout Steps" (E-commerce set): a fixed-width horizontal
breadcrumb of 24px circles joined by fixed 32px connector lines --
Cart / Shipping / Payment / Confirmation by default.

Figma's 3 style previews (Step 2/3/4) are really just \`currentStep\` at
different values -- every circle before it reads "completed", the one at
it reads "active", everything after reads "upcoming", so this takes a
single \`currentStep\` index instead of a manual per-style prop, same
derive-from-data pattern used throughout this library.

Every circle -- completed, active, AND upcoming -- shows the same
checkmark glyph (confirmed from the actual icon assets: identical path,
only the stroke color differs: fg/on-inverse white on completed's solid
black fill, fg/default on active's accent-bordered white fill, fg/subtle
on upcoming's border-subtle white fill). That's a deliberately different
visual language than Stepper/MultistepModalBlock, which show numbers for
current/upcoming -- so this is a small dedicated element, not a reuse of
either.` } } },
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 3, step: 1 } },
  },
} satisfies Meta<typeof CheckoutSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step2Shipping: Story = { args: { currentStep: 1 } };
export const Step3Payment: Story = { args: { currentStep: 2 } };
export const Step4Confirmation: Story = { args: { currentStep: 3 } };

export const AllSteps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <CheckoutSteps currentStep={0} />
      <CheckoutSteps currentStep={1} />
      <CheckoutSteps currentStep={2} />
      <CheckoutSteps currentStep={3} />
    </div>
  ),
};

export const DarkMode: Story = {
  args: { currentStep: 2 },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

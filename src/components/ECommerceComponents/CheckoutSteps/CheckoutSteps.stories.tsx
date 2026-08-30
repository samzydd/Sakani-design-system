import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutSteps } from './CheckoutSteps';

const meta = {
  title: 'E-commerce/Checkout Steps',
  component: CheckoutSteps,
  tags: ['autodocs'],
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

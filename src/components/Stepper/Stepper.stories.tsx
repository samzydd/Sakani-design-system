import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Details', description: 'Add your details' },
  { label: 'Review', description: 'Confirm and submit' },
];

const meta = {
  title: 'Composite/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { steps, current: 1 },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const FirstStep: Story = { args: { current: 0 } };
export const LastStep: Story = { args: { current: 2 } };
export const Vertical: Story = { args: { orientation: 'vertical' }, decorators: [(S) => <div style={{ width: 280 }}><S /></div>] };
export const FiveSteps: Story = {
  args: { current: 2, steps: ['Cart','Shipping','Payment','Review','Done'].map((l) => ({ label: l })) },
};
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 560 }}><S /></div>],
};

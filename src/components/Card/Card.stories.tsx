import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const Btn = ({ children, primary }: { children: React.ReactNode; primary?: boolean }) => (
  <button style={{
    padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    border: primary ? 'none' : '1px solid var(--color-border-default)',
    background: primary ? 'var(--color-accent-default)' : 'var(--color-bg-surface)',
    color: primary ? 'var(--color-fg-on-accent)' : 'var(--color-fg-default)',
  }}>{children}</button>
);

const meta = {
  title: 'Composite/Card',
  component: Card,
  tags: ['autodocs'],
  args: { title: 'Card title', description: 'This is a description for the card content.' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Interactive: Story = { args: { interactive: true } };
export const OneButton: Story = { args: { actions: <Btn primary>Confirm</Btn> } };
export const TwoButtons: Story = { args: { actions: <><Btn>Cancel</Btn><Btn primary>Confirm</Btn></> } };
export const ThreeButtons: Story = { args: { actions: <><Btn>Back</Btn><Btn>Skip</Btn><Btn primary>Next</Btn></> } };

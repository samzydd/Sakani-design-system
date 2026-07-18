import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const TriggerBtn = () => (
  <button style={{
    padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border-default)',
    background: 'var(--color-bg-surface)', color: 'var(--color-fg-default)',
    fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer',
  }}>Open popover</button>
);

const Btn = ({ children, primary }: { children: React.ReactNode; primary?: boolean }) => (
  <button style={{
    padding: '6px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    border: primary ? 'none' : '1px solid var(--color-border-default)',
    background: primary ? 'var(--color-accent-default)' : 'var(--color-bg-surface)',
    color: primary ? 'var(--color-fg-on-accent)' : 'var(--color-fg-default)',
  }}>{children}</button>
);

const meta = {
  title: 'Composite/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: { trigger: <TriggerBtn />, title: 'Popover title', description: 'Supporting description text for this popover.' },
  decorators: [(S) => <div style={{ padding: 40 }}><S /></div>],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneButton: Story = { args: { actions: <Btn primary>Got it</Btn> } };
export const TwoButtons: Story = { args: { actions: <><Btn>Cancel</Btn><Btn primary>Confirm</Btn></> } };
export const ThreeButtons: Story = { args: { actions: <><Btn>Back</Btn><Btn>Skip</Btn><Btn primary>Next</Btn></> } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

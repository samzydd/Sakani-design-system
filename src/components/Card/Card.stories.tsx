import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Composite/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Container surface. Matches Figma "Card" set:
Variant (Default|Hover|Two buttons|Three buttons), Title/Description/CTA toggles.

Figma spec: bg/surface, border/default 1px, radius-xl (16), padding 20, gap 16.
In code, Hover is a CSS :hover state. \`actions\` hugs left (Default's single
button, Two buttons' pair); \`leadingAction\` adds a standalone button on the
opposite end (Three buttons' Ghost button, space-between from the pair).` } } },
  args: { title: 'Card title', description: 'Supporting description for the card.' },
  decorators: [(S) => <div style={{ width: 320 }}><S /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { actions: <Button variant="primary" size="md">Button</Button> },
};
export const Interactive: Story = { args: { interactive: true } };
export const TwoButtons: Story = {
  args: {
    actions: <>
      <Button variant="secondary" size="md">Button</Button>
      <Button variant="primary" size="md">Button</Button>
    </>,
  },
};
export const ThreeButtons: Story = {
  args: {
    leadingAction: <Button variant="ghost" size="md">Button</Button>,
    actions: <>
      <Button variant="secondary" size="md">Button</Button>
      <Button variant="primary" size="md">Button</Button>
    </>,
  },
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  args: { actions: <Button variant="primary" size="md">Button</Button> },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

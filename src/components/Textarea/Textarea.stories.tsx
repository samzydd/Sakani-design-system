import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Multi-line text input. Matches Figma "Textarea" parent component:
State (Default|Focus|Error|Disabled|Filled), Title/Description toggles.

Exact Figma spec:
- Field: vertical, 6px gap
- Label: label/md (14px/500, fg/default)
- Box: bg/surface, border/default 1px, radius-md, padding 10/14, min-height 84px
- Value/placeholder: body/sm (14px/500, fg/subtle placeholder / fg/default value)
- Description: body/xs (13px, fg/muted)` } } },
  args: { placeholder: 'Enter text…' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Message', description: 'Max 500 characters.' } };
export const Filled: Story = { args: { label: 'Message', defaultValue: 'Entered text goes here. It can span multiple lines.' } };
export const Error: Story = { args: { label: 'Message', error: 'This field is required.' } };
export const Disabled: Story = { args: { label: 'Message', placeholder: 'Disabled', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

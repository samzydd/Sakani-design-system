import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const options = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Nigeria', value: 'ng' },
  { label: 'Netherlands', value: 'nl' },
];

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Single-select dropdown. Matches the Figma "Select" component:
Size (sm|md|lg) x State (Default|Open|Disabled|Filled), Title/Description toggles.

This is a custom listbox, not a native <select>. The native element renders
an operating-system dropdown that cannot be styled, so the open state never
matched the design. The panel here mirrors the Combobox panel exactly
(radius 6, padding 4, gap 2, bg/surface, border/default, shadow/lg).

Spec:
- Heights: sm 32 · md 40 · lg 48
- Trigger: left 14px, right 12px padding; radius-md; border/subtle 1px
- Focus/open: neutral border + soft shadow (no accent ring)
- Keyboard: Enter/Space opens, arrows move, Home/End jump, Escape closes` } } },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { placeholder: 'Select option', options, size: 'md' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: 'Country', description: 'Where are you based?' } };
export const Filled: Story = { args: { label: 'Country', defaultValue: 'ng' } };
export const Error: Story = { args: { label: 'Country', error: 'Please select a country.' } };
export const Disabled: Story = { args: { label: 'Country', disabled: true } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

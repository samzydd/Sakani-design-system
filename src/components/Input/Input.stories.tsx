import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Text input with optional label (Title), help text (Description), and
leading/trailing icons. Built to match the Figma "Input" parent component set:
Size (sm|md|lg) x State (Default|Focus|Error|Disabled|Filled)

Exact Figma spec (read from the parent component):
- Field: vertical stack, 6px gap (space-6)
- Label: label/md -> 14px / 500 / fg/default
- Field frame: bg/surface, border/subtle 1px, radius-md (8px)
padding: sm 6/14 · md 10/14 · lg 12/14 (horizontal always 14px)
- Placeholder / value: body/sm -> 14px / 500, fg/subtle / fg/default
- Description: body/xs -> 13px / fg/muted
- Icons: 16px, fg/muted stroke
- Focus: border/focus 1.5px · Error: danger/solid 1.5px · Disabled: bg/subtle` } } },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { placeholder: 'Placeholder', size: 'md' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = {};
export const WithLabel: Story = { args: { label: 'Email address', placeholder: 'you@example.com' } };
export const WithDescription: Story = { args: { label: 'Email', description: 'We will never share your email.', placeholder: 'you@example.com' } };
export const Filled: Story = { args: { label: 'Email', defaultValue: 'sam@example.com' } };
export const Error: Story = { args: { label: 'Email', defaultValue: 'not-an-email', error: 'Enter a valid email address.' } };
export const Disabled: Story = { args: { label: 'Email', placeholder: 'Disabled', disabled: true } };
export const Small:  Story = { args: { size: 'sm', label: 'Small' } };
export const Large:  Story = { args: { size: 'lg', label: 'Large' } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
  { value: 'solid', label: 'Solid' },
  { value: 'qwik', label: 'Qwik', disabled: true },
];

const meta = {
  title: 'Composite/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Searchable select with single or multi-select. Matches the Figma Combobox family:
- Combobox field: Mode (Single|Multi) x Size (sm|md|lg) x State (Default|Filled|Focus|Open|Error|Disabled)
- Combobox Panel: Results | Empty | Loading
- Combobox Option: Mode (Single|Multi) x State (Default|Hover|Selected|Disabled)

Figma spec:
field: bg/surface, border/default 1px, radius-md (8), padding 10/12/10/14
focus border/focus 1.5px · error danger/solid 1.5px · disabled bg/subtle
heights sm 32 · md 40 · lg 48
panel: bg/surface, border/default, radius-sm (6), padding 4, gap 2, shadow/lg
option: radius 4, padding 8, gap 8, hover/selected bg/subtle, label body/sm

This is a functional, accessible combobox: keyboard open/close, filter-as-you-type,
single or multi selection with chips.` } } },
  argTypes: {
    mode: { control: 'inline-radio', options: ['single', 'multi'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { options, mode: 'single', size: 'md', label: 'Framework', placeholder: 'Select a framework…' },
  decorators: [(S) => <div style={{ width: 320, minHeight: 320 }}><S /></div>],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Multi: Story = { args: { mode: 'multi', label: 'Frameworks', placeholder: 'Select frameworks…' } };
export const WithDescription: Story = { args: { description: 'Choose your primary framework.' } };
export const Error: Story = { args: { error: 'This field is required.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

export const Loading: Story = { args: { loading: true } };

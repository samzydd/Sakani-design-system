import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Core/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Linear progress bar. Two modes:
- Determinate: pass value (0–100) to show completion percentage
- Indeterminate: omit value for an animated scanning bar (e.g. page loading)

Size axis → size prop (sm | md | lg) controls track height` } } },
  args: { value: 60, size: 'md' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:       Story = { args: { value: 60 } };
export const Empty:         Story = { args: { value: 0 } };
export const Full:          Story = { args: { value: 100 } };
export const Indeterminate: Story = { args: { value: undefined } };
export const Small:         Story = { args: { size: 'sm', value: 40 } };
export const Large:         Story = { args: { size: 'lg', value: 75 } };

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

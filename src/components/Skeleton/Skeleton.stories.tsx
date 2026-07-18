import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['line', 'circle', 'block'] } },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line:   Story = { args: { variant: 'line', width: 200 } };
export const Circle: Story = { args: { variant: 'circle', width: 40, height: 40 } };
export const Block:  Story = { args: { variant: 'block', width: 320, height: 180 } };

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280, padding: 16, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)' }}>
      <Skeleton variant="block" height={140} />
      <Skeleton variant="line" width="60%" />
      <Skeleton variant="line" width="90%" />
      <Skeleton variant="line" width="75%" />
    </div>
  ),
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

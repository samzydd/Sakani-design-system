import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Core/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text:   Story = { args: { variant: 'text', width: 200 } };
export const Rect:   Story = { args: { variant: 'rect', width: 320, height: 180 } };
export const Circle: Story = { args: { variant: 'circle', width: 40, height: 40 } };

/** Card placeholder — common real-world usage */
export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280, padding: 16, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)' }}>
      <Skeleton variant="rect" height={140} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="75%" />
    </div>
  ),
};

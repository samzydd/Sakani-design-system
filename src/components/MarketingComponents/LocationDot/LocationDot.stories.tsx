import type { Meta, StoryObj } from '@storybook/react';
import { LocationDot } from './LocationDot';

const meta = {
  title: 'Marketing/Location Dot',
  component: LocationDot,
  tags: ['autodocs'],
} satisfies Meta<typeof LocationDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: { location: 'Lagos, Nigeria', status: 'active' } };
export const Remote: Story = { args: { location: 'Remote — Worldwide', status: 'remote' } };

export const DarkMode: Story = {
  args: { location: 'Lagos, Nigeria', status: 'active' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

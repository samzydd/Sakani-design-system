import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Data/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: { type: { control: 'inline-radio', options: ['no-data', 'no-results', 'error'] } },
  args: { type: 'no-data', actionLabel: 'Add item' },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NoData: Story = {};
export const NoResults: Story = { args: { type: 'no-results', actionLabel: undefined } };
export const Error: Story = { args: { type: 'error', actionLabel: 'Try again' } };
export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};

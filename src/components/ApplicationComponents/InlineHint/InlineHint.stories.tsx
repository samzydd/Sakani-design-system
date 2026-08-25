import type { Meta, StoryObj } from '@storybook/react';
import { InlineHint } from './InlineHint';

const meta = {
  title: 'Application/Inline Hint',
  component: InlineHint,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'warning'] },
  },
} satisfies Meta<typeof InlineHint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { message: 'Changes are saved automatically.' } };
export const Warning: Story = { args: { message: 'This action cannot be undone.', variant: 'warning' } };
export const DarkMode: Story = {
  args: { message: 'This action cannot be undone.', variant: 'warning' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

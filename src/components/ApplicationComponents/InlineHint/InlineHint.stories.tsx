import type { Meta, StoryObj } from '@storybook/react';
import { InlineHint } from './InlineHint';

const meta = {
  title: 'Application/Inline Hint',
  component: InlineHint,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Small inline helper text with a colored accent bar. Matches Figma
"Inline Hint": Neutral (info-solid bar + Info icon, fg/muted text) and
Warning (warning-solid bar + TriangleAlert icon, fg/default text -- the
darker text is the deliberate emphasis bump for the more serious tone).

The accent bar isn't a reuse of Divider -- Divider is bound to the
neutral border token, not the per-variant status colors this needs, so
reusing it would mean overriding its one styled property anyway. Same
call already made for ActivityFeed's rail connector.` } } },
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

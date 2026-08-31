import type { Meta, StoryObj } from '@storybook/react';
import { Zap } from 'lucide-react';
import { SubFeature } from './SubFeature';

const meta = {
  title: 'Marketing/Sub Feature',
  component: SubFeature,
  tags: ['autodocs'],
} satisfies Meta<typeof SubFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  icon: <Zap />,
  title: 'Custom theming',
  description: 'Override any token once and the whole system updates.',
};

export const HorizontalNoBorder: Story = { args: { ...args, layout: 'horizontal', leftBorder: false } };
export const HorizontalWithBorder: Story = { args: { ...args, layout: 'horizontal', leftBorder: true } };
export const VerticalNoBorder: Story = { args: { ...args, layout: 'vertical', leftBorder: false } };
export const VerticalWithBorder: Story = { args: { ...args, layout: 'vertical', leftBorder: true } };

export const DarkMode: Story = {
  args: { ...args, layout: 'horizontal', leftBorder: true },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

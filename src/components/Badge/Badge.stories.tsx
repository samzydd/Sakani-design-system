import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'],
    },
    emphasis: { control: 'inline-radio', options: ['subtle', 'solid'] },
  },
  args: { children: 'Badge', variant: 'neutral', emphasis: 'subtle' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { variant: 'neutral', children: 'Neutral' } };
export const Accent:  Story = { args: { variant: 'accent',  children: 'Accent' } };
export const Success: Story = { args: { variant: 'success', children: 'Success' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } };
export const Danger:  Story = { args: { variant: 'danger',  children: 'Danger' } };
export const Info:    Story = { args: { variant: 'info',    children: 'Info' } };

/** Full 6x2 matrix - matches the Figma component set layout exactly. */
export const AllVariants: Story = {
  render: () => {
    const variants = ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Badge key={v} variant={v} emphasis="subtle">{v}</Badge>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Badge key={v} variant={v} emphasis="solid">{v}</Badge>
          ))}
        </div>
      </div>
    );
  },
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

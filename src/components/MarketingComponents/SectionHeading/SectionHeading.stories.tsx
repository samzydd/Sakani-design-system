import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Marketing/Section Heading',
  component: SectionHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  eyebrow: 'Features',
  title: 'Everything you need to ship faster',
  subtitle: 'A complete system of tokens, components, and blocks — designed for production from day one.',
};

export const Center: Story = {
  args: { ...args, align: 'center' },
  render: (a) => <div style={{ width: 560 }}><SectionHeading {...a} /></div>,
};

export const Left: Story = {
  args: { ...args, align: 'left' },
  render: (a) => <div style={{ width: 560 }}><SectionHeading {...a} /></div>,
};

export const DarkMode: Story = {
  args: { ...args, align: 'center' },
  render: (a) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 608 }}>
      <div style={{ width: 560 }}><SectionHeading {...a} /></div>
    </div>
  ),
};

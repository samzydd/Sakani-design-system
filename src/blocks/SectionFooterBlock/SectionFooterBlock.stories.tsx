import type { Meta, StoryObj } from '@storybook/react';
import { SectionFooterBlock } from './SectionFooterBlock';

const meta = {
  title: 'Blocks/Application/Section Footer',
  component: SectionFooterBlock,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 713 }}><S /></div>],
} satisfies Meta<typeof SectionFooterBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    variant: 'centered',
    text: 'Sakani v1.2 · © 2026 Sakani. Open source under the MIT license.',
  },
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 713, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

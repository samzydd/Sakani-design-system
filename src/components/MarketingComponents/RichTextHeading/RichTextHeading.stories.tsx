import type { Meta, StoryObj } from '@storybook/react';
import { RichTextHeading } from './RichTextHeading';

const meta = {
  title: 'Marketing/Rich Text Heading',
  component: RichTextHeading,
  tags: ['autodocs'],
} satisfies Meta<typeof RichTextHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H2: Story = {
  args: { level: 'h2', children: 'Why design systems fail in year two' },
};

export const H3: Story = {
  args: { level: 'h3', children: 'The maintenance gap nobody plans for' },
};

export const DarkMode: Story = {
  args: { level: 'h2', children: 'Why design systems fail in year two' },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

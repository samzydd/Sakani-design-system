import type { Meta, StoryObj } from '@storybook/react';
import { RichTextParagraph } from './RichTextParagraph';
import { Link } from '../../Link';

const meta = {
  title: 'Marketing/Rich Text Paragraph',
  component: RichTextParagraph,
  tags: ['autodocs'],
} satisfies Meta<typeof RichTextParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Most teams treat a design system as a one-time project instead of an ongoing product. The gap shows up quietly, then all at once.',
  },
  render: (args) => <div style={{ width: 560 }}><RichTextParagraph {...args} /></div>,
};

export const WithLink: Story = {
  args: {
    children: (
      <>
        {"If you're not sure where your system stands, start with our "}
        <Link href="#">full audit checklist</Link>
        {' before adding new components.'}
      </>
    ),
  },
  render: (args) => <div style={{ width: 560 }}><RichTextParagraph {...args} /></div>,
};

export const DarkMode: Story = {
  args: {
    children: (
      <>
        {"If you're not sure where your system stands, start with our "}
        <Link href="#">full audit checklist</Link>
        {' before adding new components.'}
      </>
    ),
  },
  render: (args) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 608 }}>
      <div style={{ width: 560 }}><RichTextParagraph {...args} /></div>
    </div>
  ),
};

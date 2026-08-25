import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tags } from './Tags';

const meta = {
  title: 'Application/Tags',
  component: Tags,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 400 }}><S /></div>],
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialTags = ['Design', 'Engineering', 'Fintech', 'Open source'];

export const Default: Story = {
  args: {
    tags: initialTags,
  },
};

const RemovableDemo = () => {
  const [tags, setTags] = React.useState(initialTags);
  return (
    <Tags
      tags={tags}
      onRemove={(tag) => setTags((current) => current.filter((t) => t !== tag))}
    />
  );
};

export const Removable: Story = {
  args: { tags: initialTags },
  render: () => <RemovableDemo />,
};

export const DarkMode: Story = {
  args: { tags: initialTags, onRemove: () => {} },
  decorators: [(S) => <div className="dark" style={{ width: 400, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

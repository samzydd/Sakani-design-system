import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tags } from './Tags';

const meta = {
  title: 'Application/Tags',
  component: Tags,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Tags" -- a wrapped row of pill tags. Its two style previews
(Default / Removable) collapse to one axis, derived rather than a manual
prop, same judgment applied throughout this Application set: passing
\`onRemove\` is what turns every tag removable, since Figma's own spec
toggles the whole list at once rather than per-tag.

Each tag reuses the real Badge component directly (neutral/subtle is an
exact token match: bg/subtle, fg/muted, radius/full, 2px/8px padding) --
the remove "x" is Badge's own rightIcon slot, wrapped in a button so it's
independently clickable/focusable.` } } },
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

import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoardBlock } from './KanbanBoardBlock';

const meta = {
  title: 'Blocks/Data & Content/Kanban Board',
  component: KanbanBoardBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    state: { control: 'select', options: ['default', 'loading', 'empty-column', 'dragging'] },
  },
} satisfies Meta<typeof KanbanBoardBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Resting board: columns with counts, cards, and an add-task affordance. */
export const Default: Story = { args: { state: 'default' } };
/** Card skeletons hold each column's shape so nothing shifts on load. */
export const Loading: Story = { args: { state: 'loading' } };
/** A column with no cards shows a dashed drop zone rather than blank space. */
export const EmptyColumn: Story = { args: { state: 'empty-column' } };
/** A card lifts with raised elevation while a placeholder marks the drop target. */
export const Dragging: Story = { args: { state: 'dragging' } };

export const DarkMode: Story = {
  args: { state: 'default' },
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};

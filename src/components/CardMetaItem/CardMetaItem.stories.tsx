import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, MessageSquare } from 'lucide-react';
import { CardMetaItem } from './CardMetaItem';

const meta = {
  title: 'Composite/Card Meta Item',
  component: CardMetaItem,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Icon + value pair used in the BoardCard footer (due date, comments,
attachments, links, subtask progress). Matches the Figma "Card Meta Item"
component, whose \`icon\` (instance-swap) and \`label\` (text) map to these props.` } } },
  args: { children: 'Jan 25', icon: <Calendar size={13} /> },
} satisfies Meta<typeof CardMetaItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Date: Story = {};
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 10 }}>
      <CardMetaItem icon={<Calendar size={13} />}>Jan 25</CardMetaItem>
      <CardMetaItem icon={<MessageSquare size={13} />}>4</CardMetaItem>
    </div>
  ),
};

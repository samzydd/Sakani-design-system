import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, MessageSquare } from 'lucide-react';
import { CardMetaItem } from './CardMetaItem';

const meta = {
  title: 'Composite/Card Meta Item',
  component: CardMetaItem,
  tags: ['autodocs'],
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

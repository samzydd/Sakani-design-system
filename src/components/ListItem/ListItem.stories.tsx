import type { Meta, StoryObj } from '@storybook/react';
import { FileText, ChevronRight } from 'lucide-react';
import { ListItem } from './ListItem';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Composite/List Item',
  component: ListItem,
  tags: ['autodocs'],
  args: { title: 'List item title', description: 'Supporting description text' },
  decorators: [(S) => <div style={{ width: 360 }}><S /></div>],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TitleOnly: Story = { args: { description: undefined } };
export const Selected: Story = { args: { selected: true } };
export const WithLeadingIcon: Story = { args: { leading: <FileText size={18} strokeWidth={1.5} /> } };
export const WithTrailing: Story = { args: { leading: <FileText size={18} strokeWidth={1.5} />, trailing: <ChevronRight size={16} strokeWidth={1.5} /> } };
export const WithBadge: Story = { args: { trailing: <Badge variant="success" emphasis="subtle">New</Badge> } };

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ListItem title="Documents" description="12 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} />
      <ListItem title="Images" description="48 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} selected />
      <ListItem title="Archive" description="3 files" leading={<FileText size={18} strokeWidth={1.5} />} trailing={<ChevronRight size={16} strokeWidth={1.5} />} />
    </div>
  ),
};

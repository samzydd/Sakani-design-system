import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from 'lucide-react';
import { BoardColumn } from './BoardColumn';
import { BoardCard } from '../BoardCard';
import { Badge } from '../Badge';
import { Checkbox } from '../Checkbox';
import { CardMetaItem } from '../CardMetaItem';

const meta = {
  title: 'Composite/Board Column',
  component: BoardColumn,
  tags: ['autodocs'],
} satisfies Meta<typeof BoardColumn>;
export default meta;
type Story = StoryObj<typeof meta>;

const card = (title: string) => (
  <BoardCard
    type="default"
    leading={<Checkbox />}
    title={title}
    tags={<Badge variant="accent">Design</Badge>}
    meta={<CardMetaItem icon={<Calendar size={13} />}>Jan 25</CardMetaItem>}
  />
);

export const Default: Story = {
  args: { title: 'To-do', count: <Badge variant="neutral">3</Badge>, children: <>{card('Design system update')}{card('Retention rate')}</> },
};
export const Empty: Story = { args: { state: 'empty', title: 'In review', count: <Badge variant="neutral">0</Badge> } };
export const DarkMode: Story = {
  args: Default.args,
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)', padding: 24 }}><S /></div>)],
};

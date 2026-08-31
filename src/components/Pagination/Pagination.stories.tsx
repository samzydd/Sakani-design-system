import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Composite/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Page navigation. Matches Figma "Pagination": prev/next arrows + numbered page
buttons (32px, radius-sm, bg/surface, border/subtle), active page filled accent.
Collapses long ranges with ellipses.` } } },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = ({ total = 10, start = 1 }: { total?: number; start?: number }) => {
  const [page, setPage] = React.useState(start);
  return <Pagination total={total} page={page} onPageChange={setPage} />;
};

export const Default: Story = { render: () => <Interactive total={10} start={1} /> };
export const MiddlePage: Story = { render: () => <Interactive total={20} start={10} /> };
export const FewPages: Story = { render: () => <Interactive total={4} start={2} /> };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => <Interactive total={20} start={10} />,
};

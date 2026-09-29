import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Composite/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Page navigation. Matches Figma "Pagination": prev/next arrows + numbered page
buttons (32px, radius-sm, bg/surface, border/subtle), active page filled accent.
First and last page are always shown, with \`siblings\` pages on each side of
the current one and ellipses for the gaps. The slot count stays fixed
(7 by default) so the control doesn't change width as you page through.` } } },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = ({ total = 10, start = 1, siblings }: { total?: number; start?: number; siblings?: number }) => {
  const [page, setPage] = React.useState(start);
  return <Pagination total={total} page={page} siblings={siblings} onPageChange={setPage} />;
};

export const Default: Story = { render: () => <Interactive total={10} start={1} /> };
export const MiddlePage: Story = { render: () => <Interactive total={20} start={10} /> };
export const FewPages: Story = { render: () => <Interactive total={4} start={2} /> };
/** 50 pages: step through with the arrows — the window follows the current page. */
export const ManyPages: Story = { render: () => <Interactive total={50} start={25} /> };
export const TwoSiblings: Story = { render: () => <Interactive total={24} start={12} siblings={2} /> };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => <Interactive total={20} start={10} />,
};

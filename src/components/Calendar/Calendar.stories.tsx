import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Composite/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return <Calendar value={date} onChange={setDate} />;
};

export const Default: Story = { render: () => <Interactive /> };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => <Interactive />,
};

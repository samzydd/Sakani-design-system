import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Calendar, type DateRange } from './Calendar';

const meta = {
  title: 'Composite/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Single = ({ headerType }: { headerType?: 'arrows' | 'dropdowns' }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return <Calendar value={date} onChange={setDate} headerType={headerType} />;
};

const Range = () => {
  const [range, setRange] = React.useState<DateRange>({});
  return <Calendar mode="range" range={range} onRangeChange={setRange} />;
};

export const Default: Story = { render: () => <Single /> };

/** Dropdowns header (Figma: Calendar Header Type=Dropdowns). */
export const DropdownsHeader: Story = { render: () => <Single headerType="dropdowns" /> };

/** Range mode — click a start and end date; days between show the In Range state. */
export const RangeSelection: Story = { render: () => <Range /> };

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
  render: () => <Single />,
};

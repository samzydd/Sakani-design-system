import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Calendar, type DateRange } from './Calendar';

const meta = {
  title: 'Composite/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Month calendar / date picker. Matches the Figma "Calendar" kit:
Calendar container (288px, radius-xl, bg/surface, border/default)
Calendar Header — Type: Arrows | Dropdowns (month + year selects)
Calendar Weekdays + Calendar Day
Calendar Day states: Default|Hover|Selected|Today|In Range|Outside|Disabled

Modes:
- **single** — click to select one date (value/onChange)
- **range** — first click sets the start, second completes it (range/onRangeChange); clicking before the start swaps the endpoints. Days between endpoints render the Figma "In Range" state (accent/subtle, square corners).

A11y: every day button carries a full-date aria-label; selects are labelled.` } } },
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

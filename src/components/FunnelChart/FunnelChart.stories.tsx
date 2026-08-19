import type { Meta, StoryObj } from '@storybook/react';
import { FunnelChart } from './FunnelChart';

const data = [
  { label: 'Visitors', value: 5400 },
  { label: 'Signups', value: 3800 },
  { label: 'Trials', value: 2600 },
  { label: 'Qualified', value: 1700 },
  { label: 'Negotiation', value: 900 },
  { label: 'Closed won', value: 480 },
];

const meta = {
  title: 'Charts/Funnel Chart',
  component: FunnelChart,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
  args: { data, size: 'md' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 560, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

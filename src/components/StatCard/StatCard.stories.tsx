import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign, Users, Activity } from 'lucide-react';
import { StatCard } from './StatCard';

const meta = {
  title: 'Composite/Stat Card',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['minimal', 'icon', 'featured'] },
    trend: { control: 'inline-radio', options: ['up', 'down', 'flat'] },
  },
  args: { title: 'Total revenue', value: '$48,120', delta: '+12.5%', trend: 'up', variant: 'minimal' },
  decorators: [(S) => <div style={{ width: 260 }}><S /></div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {};
export const WithIcon: Story = { args: { variant: 'icon', icon: DollarSign } };
export const Featured: Story = { args: { variant: 'featured', icon: Activity } };
export const TrendDown: Story = { args: { variant: 'icon', icon: Users, delta: '-3.2%', trend: 'down', title: 'Active users', value: '2,340' } };
export const WithMenu: Story = { args: { variant: 'icon', icon: DollarSign, showMenu: true } };

export const Grid: Story = {
  decorators: [(S) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: 820 }}><S /></div>],
  render: () => (
    <>
      <StatCard variant="icon" icon={DollarSign} title="Revenue" value="$48,120" delta="+12.5%" trend="up" />
      <StatCard variant="icon" icon={Users} title="Users" value="2,340" delta="-3.2%" trend="down" />
      <StatCard variant="icon" icon={Activity} title="Uptime" value="99.9%" delta="0.0%" trend="flat" />
    </>
  ),
};

export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 300 }}><S /></div>],
  args: { variant: 'icon', icon: DollarSign },
};

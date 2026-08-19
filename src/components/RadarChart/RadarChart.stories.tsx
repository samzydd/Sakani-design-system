import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from './RadarChart';

const data = [
  { label: 'January', value: 240 },
  { label: 'February', value: 300 },
  { label: 'March', value: 256 },
  { label: 'April', value: 84 },
  { label: 'May', value: 210 },
  { label: 'June', value: 280 },
];

const multiData = [
  { label: 'January', value: 240, value2: 60 },
  { label: 'February', value: 300, value2: 201 },
  { label: 'March', value: 256, value2: 110 },
  { label: 'April', value: 84, value2: 200 },
  { label: 'May', value: 210, value2: 110 },
  { label: 'June', value: 280, value2: 120 },
];

const meta = {
  title: 'Charts/Radar Chart',
  component: RadarChart,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'dots', 'lines-only', 'circle-grid', 'circle-grid-no-lines',
        'grid-custom', 'grid-filled', 'circle-grid-filled', 'multiple', 'custom-label',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { data, variant: 'default', size: 'md' },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dots: Story = { args: { variant: 'dots' } };
export const LinesOnly: Story = { args: { variant: 'lines-only', data: multiData } };
export const CircleGrid: Story = { args: { variant: 'circle-grid' } };
export const CircleGridNoLines: Story = { args: { variant: 'circle-grid-no-lines' } };
export const GridCustom: Story = { args: { variant: 'grid-custom' } };
export const GridFilled: Story = { args: { variant: 'grid-filled' } };
export const CircleGridFilled: Story = { args: { variant: 'circle-grid-filled' } };
export const Multiple: Story = {
  args: { variant: 'multiple', data: multiData, seriesLabels: ['Revenue', 'Costs'] },
};
export const CustomLabel: Story = { args: { variant: 'custom-label', data: multiData } };
export const Large: Story = { args: { size: 'lg' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ width: 420, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

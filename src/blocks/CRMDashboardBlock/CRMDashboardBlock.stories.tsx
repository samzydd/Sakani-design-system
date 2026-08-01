import type { Meta, StoryObj } from '@storybook/react';
import { CRMDashboardBlock } from './CRMDashboardBlock';

const meta = {
  title: 'Blocks/Application/CRM Dashboard',
  component: CRMDashboardBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CRMDashboardBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};

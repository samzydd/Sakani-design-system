import type { Meta, StoryObj } from '@storybook/react';
import { CRMDashboardBlock } from './CRMDashboardBlock';

const meta = {
  title: 'Blocks/Application/CRM Dashboard',
  component: CRMDashboardBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A full-page CRM leads view assembled entirely from Sakani components:
Sidebar (icon rail) · TopBar · Breadcrumb · Tabs · Checkbox · Select ·
Slider · Input · FilterChip · Button · Table · Pagination · Badge · Avatar.

Matches the Figma "CRM dashboard" block: icon-rail sidebar,
breadcrumb top bar, entity tabs, a collapsible filter panel, and a data
table with toolbar + footer pagination.

A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly — swap the sample data, change columns,
add or remove filter groups. No new primitives are introduced here.` } }, layout: 'fullscreen' },
} satisfies Meta<typeof CRMDashboardBlock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Embedded taller than its real content (e.g. a demo frame) — the leads
 * table extends with faint placeholder row dividers down to the bottom
 * instead of leaving blank canvas below the footer. */
export const FilledHeight: Story = {
  args: { fillPlaceholders: true },
};

export const DarkMode: Story = {
  decorators: [(S) => (<div className="dark" style={{ background: 'var(--color-bg-canvas)' }}><S /></div>)],
};

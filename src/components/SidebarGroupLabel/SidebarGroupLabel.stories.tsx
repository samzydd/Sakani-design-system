import type { Meta, StoryObj } from '@storybook/react';
import { SidebarGroupLabel } from './SidebarGroupLabel';

const meta = {
  title: 'Composite/Sidebar/Group Label',
  component: SidebarGroupLabel,
  tags: ['autodocs'],
  args: { children: 'Platform' },
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarGroupLabel>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

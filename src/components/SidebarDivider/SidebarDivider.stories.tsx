import type { Meta, StoryObj } from '@storybook/react';
import { SidebarDivider } from './SidebarDivider';

const meta = {
  title: 'Composite/Sidebar/Divider',
  component: SidebarDivider,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 224, padding: 12, background: 'var(--color-bg-surface)' }}><S /></div>],
} satisfies Meta<typeof SidebarDivider>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

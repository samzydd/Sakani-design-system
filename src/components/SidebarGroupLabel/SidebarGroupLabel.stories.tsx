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

/** Dark mode — parts sit on a sidebar surface; .dark flips the token layer. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ width: 248, padding: 12, background: 'var(--color-bg-surface)' }}>
      <S />
    </div>
  )],
};

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Core/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge', variant: 'default', size: 'md' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'default', children: 'Default' } };
export const Success: Story = { args: { variant: 'success', children: 'Active' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } };
export const Danger:  Story = { args: { variant: 'danger',  children: 'Failed' } };
export const Info:    Story = { args: { variant: 'info',    children: 'Info' } };
export const Small:   Story = { args: { size: 'sm', children: 'Small' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

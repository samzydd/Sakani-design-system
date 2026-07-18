import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Composite/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Current' },
  ] },
};

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Settings' }] },
};

export const DeepTrail: Story = {
  args: { items: [
    { label: 'Home', href: '#' },
    { label: 'Workspace', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Sakani', href: '#' },
    { label: 'Components' },
  ] },
};

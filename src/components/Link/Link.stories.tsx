import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Core/Link',
  component: Link,
  tags: ['autodocs'],
  args: { children: 'Read the docs', href: '#' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default:  Story = {};
export const External: Story = { args: { external: true, children: 'View on GitHub', href: 'https://github.com' } };

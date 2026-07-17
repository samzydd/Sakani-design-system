import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Core/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const WithLabel:  Story = { args: { label: 'or' } };
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div style={{ display: 'flex', height: 48, alignItems: 'center', gap: 16 }}>
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};

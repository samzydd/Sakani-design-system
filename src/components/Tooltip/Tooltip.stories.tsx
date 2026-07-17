import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const Trigger = () => (
  <button style={{
    padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border-default)',
    background: 'var(--color-bg-surface)', color: 'var(--color-fg-default)',
    fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer',
  }}>
    Hover me
  </button>
);

const meta = {
  title: 'Core/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    pointer: { control: 'select', options: [
      'top-left','top-center','top-right','bottom-left','bottom-center','bottom-right','center-left','center-right',
    ] },
  },
  args: { title: 'Tooltip title', pointer: 'top-center', children: <Trigger /> },
  decorators: [(Story) => <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSubtitle: Story = { args: { title: 'Tooltip title', subtitle: 'Supporting detail text.' } };
export const BottomCenter: Story = { args: { pointer: 'bottom-center' } };
export const CenterRight: Story = { args: { pointer: 'center-right' } };

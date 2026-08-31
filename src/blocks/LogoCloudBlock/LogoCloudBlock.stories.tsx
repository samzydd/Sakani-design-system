import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloudBlock } from './LogoCloudBlock';

const meta = {
  title: 'Blocks/Marketing/Logo Cloud',
  component: LogoCloudBlock,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LogoCloudBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monochrome: Story = { args: { variant: 'monochrome' } };
export const Color: Story = { args: { variant: 'color' } };

export const DarkMode: Story = {
  args: { variant: 'monochrome' },
  decorators: [(S) => <div className="dark"><S /></div>],
};

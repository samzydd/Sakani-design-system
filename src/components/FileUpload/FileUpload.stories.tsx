import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Composite/File Upload',
  component: FileUpload,
  tags: ['autodocs'],
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { multiple: true, hint: 'Upload up to 10 files' } };
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 420 }}><S /></div>],
};

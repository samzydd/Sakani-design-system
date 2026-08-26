import type { Meta, StoryObj } from '@storybook/react';
import { FileUploadPanelBlock } from './FileUploadPanelBlock';

const meta = {
  title: 'Blocks/Application/File Upload Panel',
  component: FileUploadPanelBlock,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['empty', 'with-files'],
    },
  },
} satisfies Meta<typeof FileUploadPanelBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Just the dropzone -- no files yet. */
export const Empty: Story = { args: { state: 'empty' } };
/** Dropzone plus a file list covering Complete, Pending confirmation, and Uploading. */
export const WithFiles: Story = { args: { state: 'with-files' } };

export const DarkMode: Story = {
  args: { state: 'with-files' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

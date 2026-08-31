import type { Meta, StoryObj } from '@storybook/react';
import { FileUploadPanelBlock } from './FileUploadPanelBlock';

const meta = {
  title: 'Blocks/Application/File Upload Panel',
  component: FileUploadPanelBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "File Upload Panel": dashed dropzone -> list of files, each
showing a different status (Complete / Pending confirmation / Uploading).
Empty/With Files isn't a manual prop -- the list section only renders
once \`files\` is non-empty, same "derive from data" pattern used
throughout the Application set.

The dropzone is NOT a reuse of the shared FileUpload component: FileUpload
owns its own internal file list (name + remove button only), which can't
show per-file size/status/progress or coexist with this block's richer
row -- so the dropzone is rebuilt here directly (same drag/drop/click
interaction), and IconButton + Progress are reused for the row controls.` } } },
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

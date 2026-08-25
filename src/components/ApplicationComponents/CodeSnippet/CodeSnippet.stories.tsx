import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippet } from './CodeSnippet';

const sample = `import { Button } from '@sakani/react'

export function App() {
  return <Button variant='primary'>Get started</Button>
}`;

const meta = {
  title: 'Application/Code Snippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  args: { code: sample },
  decorators: [(S) => <div style={{ width: 520 }}><S /></div>],
} satisfies Meta<typeof CodeSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHeader: Story = { args: { filename: 'App.tsx' } };
export const DarkMode: Story = {
  args: { filename: 'App.tsx' },
  decorators: [(S) => <div className="dark" style={{ width: 520, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

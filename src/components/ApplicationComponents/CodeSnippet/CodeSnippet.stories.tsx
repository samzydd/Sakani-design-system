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
  parameters: { docs: { description: { component: `Code block. Matches Figma "Code Snippet":
- **Default** — plain card, mono text, no chrome
- **With Header** — filename row + copy button above the code

The header isn't a separate variant to keep in sync -- it shows whenever
a \`filename\` is passed, same judgment already applied throughout this
Application set (AvatarUpload's filled/empty, Balance's change row).

Highlighting: Figma's sample only ever colors two token classes --
keywords and string literals -- so this is a small regex tokenizer
rather than a real dependency (Prism/Shiki aren't in package.json, and
pulling one in for two token classes would be a lot of weight for what
this component actually needs). Anything else renders in fg/default.

Editable (\`editable\` prop): a real \`<textarea>\` sits directly on top of
the same highlighted text, sized and padded identically -- the textarea's
own text is transparent (only its caret and selection paint), so typing,
selection, undo, and the cursor are all genuine native textarea behavior;
the highlighted layer underneath is what's actually visible. This is the
standard technique for a highlighted-but-editable text field short of a
real editor (CodeMirror/Monaco) -- contentEditable with re-highlighted
innerHTML on every keystroke fights the caret position constantly, which
this sidesteps entirely by never touching the real text node the caret
lives in.` } } },
  args: { code: sample },
  decorators: [(S) => <div style={{ width: 520 }}><S /></div>],
} satisfies Meta<typeof CodeSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHeader: Story = { args: { filename: 'App.tsx' } };
export const Editable: Story = {
  args: { filename: 'App.tsx', editable: true },
};
export const EditableEmpty: Story = {
  args: { filename: 'scratch.ts', editable: true, code: '', placeholder: 'Write or paste code…' },
};
export const DarkMode: Story = {
  args: { filename: 'App.tsx' },
  decorators: [(S) => <div className="dark" style={{ width: 520, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

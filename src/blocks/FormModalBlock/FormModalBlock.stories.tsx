import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormModalBlock } from './FormModalBlock';
import { Button } from '../../components/Button';

const meta = {
  title: 'Blocks/Application/Form Modal',
  component: FormModalBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: swap the fields for your own form.

Matches Figma "Form Modal": "Invite a teammate" -- Email input + Role
select, Cancel/Send invite footer. Reuses the shared Modal shell (its
\`children\` slot renders the form between the header and the footer's
Divider) rather than duplicating Modal's portal/focus-trap/dark-mode
plumbing here -- Input and Select are dropped straight in unmodified,
both already exact matches for Figma's Input/Select components.

Loading isn't a separate manual state either -- submitting sets
\`confirmLoading\` on Modal, which already renders the spinner via Button;
only the label text ("Send invite" -> "Sending…") is swapped alongside it.` } } },
} satisfies Meta<typeof FormModalBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Invite a teammate</Button>
        <FormModalBlock open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Invite a teammate</Button>
        <FormModalBlock open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', minHeight: 300 }}>
        <Button onClick={() => setOpen(true)}>Invite a teammate</Button>
        <FormModalBlock open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../Button';

const meta = {
  title: 'Application/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Confirmation dialog. Matches Figma "Modal":
- **Default** — title + description + Cancel/Confirm
- **Destructive** — danger icon-wrap next to the title, Delete-styled confirm

"Destructive" is a real prop, not derived from \`icon\` presence -- unlike
most of this Application set it governs three things at once (icon-wrap,
icon-wrap color, confirm button color), so collapsing it into "pass an
icon and we'll guess" would conflate a non-destructive modal that happens
to want a custom icon with one that's actually destructive.

Functional, not just the static card: portals to document.body (so it
escapes any parent stacking/overflow context), dims a backdrop, closes on
Escape or backdrop click (each can be disabled independently), locks body
scroll while open, and does a lightweight focus trap + focus-return on
close -- same portal technique already used by Select, same
focus-return-on-close idea already used by Popover.` } } },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Update billing plan"
          description="This will change your plan to Pro and take effect immediately. Your card on file will be charged the prorated difference."
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete project</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          variant="destructive"
          title="Delete project"
          description='This will permanently delete "Sakani Design System" and all its data. This action cannot be undone.'
          confirmLabel="Delete project"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Closed: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Update billing plan"
          description="This will change your plan to Pro and take effect immediately."
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', minHeight: 300 }}>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          variant="destructive"
          title="Delete project"
          description='This will permanently delete "Sakani Design System" and all its data. This action cannot be undone.'
          confirmLabel="Delete project"
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../Button';

const meta = {
  title: 'Application/Modal',
  component: Modal,
  tags: ['autodocs'],
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

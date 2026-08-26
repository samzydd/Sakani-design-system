import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormModalBlock } from './FormModalBlock';
import { Button } from '../../components/Button';

const meta = {
  title: 'Blocks/Application/Form Modal',
  component: FormModalBlock,
  tags: ['autodocs'],
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

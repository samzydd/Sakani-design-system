import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultistepModalBlock } from './MultistepModalBlock';
import { Button } from '../../components/Button';

const meta = {
  title: 'Blocks/Application/Multistep Modal',
  component: MultistepModalBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof MultistepModalBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <MultistepModalBlock open={open} onClose={() => setOpen(false)} initialStep={0} />
      </>
    );
  },
};

export const Step2: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <MultistepModalBlock open={open} onClose={() => setOpen(false)} initialStep={1} />
      </>
    );
  },
};

export const Step3: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <MultistepModalBlock open={open} onClose={() => setOpen(false)} initialStep={2} />
      </>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', minHeight: 300 }}>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <MultistepModalBlock open={open} onClose={() => setOpen(false)} initialStep={1} />
      </div>
    );
  },
};

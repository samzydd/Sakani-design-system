import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultistepModalBlock } from './MultistepModalBlock';
import { Button } from '../../components/Button';

const meta = {
  title: 'Blocks/Application/Multistep Modal',
  component: MultistepModalBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly: swap the steps/content for your own flow.

Matches Figma "Multistep": a steps row (no connector
lines between circles, unlike the standalone Stepper component) -> title
+ description -> Back / Continue-or-Submit footer. No divider before the
footer and no header/close-X row at all -- both toggled off via Modal's
\`hideFooterDivider\`/\`hideHeader\` props (added for this block), and the
Back/Continue footer spans the full card width via \`footerJustify="between"\`
(also added for this block; the base Modal's Cancel/Confirm stay clustered
at the right) -- so the shared Modal still owns the portal/backdrop/
focus-trap/dark-mode plumbing.

The steps row is NOT a reuse of the shared Stepper component: Stepper
always draws a connector between circles and sizes them at 32px (matching
the standalone "Progress Item Value" atom, per an earlier fix); this
component's own circles are a deliberately smaller 28px with no connector
at all -- a genuinely different shape, so it's built locally here instead,
bound to the same tokens.` } } },
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

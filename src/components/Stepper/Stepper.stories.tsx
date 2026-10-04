import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';
import { Button } from '../Button';

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Details', description: 'Add your details' },
  { label: 'Review', description: 'Confirm and submit' },
];

const meta = {
  title: 'Composite/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Stepper / StepperStep

Progress stepper. Matches Figma "Stepper" (Steps 2-6) + "Stepper Step"
(Completed | Current | Upcoming).

The circle is Figma's own standalone "Progress Item Value" component embedded here, not a bespoke shape -- its 3 statuses
map 1:1 to completed/current/upcoming:
- **Completed** — bg/inverse fill (32px), fg/on-inverse check
- **Current** — bg/surface fill, accent/default 2px ring, fg/default number, bold label
- **Upcoming** — bg/surface fill, border/subtle 2px ring, fg/muted number, muted label

(Verified directly against that node -- an earlier pass had drifted: 28px
instead of 32, accent/default instead of bg/inverse for Completed, and
bg/subtle + border/default 1.5px instead of bg/surface + border/subtle 2px
for Upcoming.)
Connectors between steps color accent up to the current step.` } } },
  args: { steps, current: 1 },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const FirstStep: Story = { args: { current: 0 } };
export const LastStep: Story = { args: { current: 2 } };
export const Vertical: Story = { args: { orientation: 'vertical' }, decorators: [(S) => <div style={{ width: 280 }}><S /></div>] };
export const FiveSteps: Story = {
  args: { current: 2, steps: ['Cart','Shipping','Payment','Review','Done'].map((l) => ({ label: l })) },
};
export const DarkMode: Story = {
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)', width: 560 }}><S /></div>],
};

/** Try the motion: Back / Next move one step (the bar fills or drains between them), and the
 *  jump buttons move several at once (the fill hands off bar to bar). Respects reduced motion. */
const Playground = ({ vertical }: { vertical?: boolean }) => {
  const [current, setCurrent] = React.useState(0);
  const last = 4;
  return (
    <div style={{ display: 'grid', gap: 24, width: vertical ? 280 : 640 }}>
      <Stepper steps={['Cart', 'Shipping', 'Payment', 'Review', 'Done'].map((label) => ({ label }))} current={current} orientation={vertical ? 'vertical' : 'horizontal'} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="secondary" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>Back</Button>
        <Button size="sm" onClick={() => setCurrent((c) => Math.min(last, c + 1))}>Next</Button>
        <Button variant="ghost" size="sm" onClick={() => setCurrent(0)}>Jump to 1</Button>
        <Button variant="ghost" size="sm" onClick={() => setCurrent(last)}>Jump to 5</Button>
      </div>
    </div>
  );
};
export const Animated: Story = { render: () => <Playground />, decorators: [] };
export const AnimatedVertical: Story = { render: () => <Playground vertical />, decorators: [] };

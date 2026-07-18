import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const Trigger = ({ label = 'Hover me' }: { label?: string }) => (
  <button style={{
    padding: '8px 16px', borderRadius: 8, border: '1px solid var(--color-border-default)',
    background: 'var(--color-bg-surface)', color: 'var(--color-fg-default)',
    fontFamily: 'var(--font-sans)', fontSize: 14, cursor: 'pointer',
  }}>{label}</button>
);

const meta = {
  title: 'Core/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    // Figma "Pointer" axis
    pointer: {
      control: 'select',
      options: [
        'top-left','top-center','top-right',
        'bottom-left','bottom-center','bottom-right',
        'center-left','center-right',
      ],
      description: 'Pointer position (Figma: Pointer axis)',
    },
    // Figma "Title" text
    title: { control: 'text', description: 'Tooltip title (Figma: Title)' },
    // Figma "Subtitle" toggle — leave the field empty to hide it (Subtitle = off)
    subtitle: {
      control: 'text',
      description: 'Supporting line (Figma: Subtitle). Clear the field to hide it — this is the on/off toggle.',
    },
  },
  args: { title: 'Tooltip title', subtitle: 'Supporting detail text.', pointer: 'top-center', children: <Trigger /> },
  decorators: [(Story) => <div style={{ padding: 100, display: 'flex', justifyContent: 'center' }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — with subtitle. Clear the "subtitle" field in the Controls panel to hide it. */
export const Default: Story = {};

/** Subtitle on (Figma: Subtitle = true). */
export const WithSubtitle: Story = { args: { title: 'Tooltip title', subtitle: 'Supporting detail text.' } };

/** Subtitle off (Figma: Subtitle = false) — title only. */
export const TitleOnly: Story = { args: { title: 'Tooltip title', subtitle: undefined } };

export const BottomCenter: Story = { args: { pointer: 'bottom-center' } };
export const CenterRight: Story = { args: { pointer: 'center-right' } };

/** All 8 pointer positions — hover each to see the caret placement. */
export const AllPointers: Story = {
  decorators: [(S) => <div style={{ padding: 120 }}><S /></div>],
  render: () => {
    const pointers = [
      'top-left','top-center','top-right',
      'bottom-left','bottom-center','bottom-right',
      'center-left','center-right',
    ] as const;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64, placeItems: 'center' }}>
        {pointers.map((p) => (
          <Tooltip key={p} title="Tooltip" subtitle={p} pointer={p}>
            <Trigger label={p} />
          </Tooltip>
        ))}
      </div>
    );
  },
};

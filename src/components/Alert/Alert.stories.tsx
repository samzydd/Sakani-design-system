import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Composite/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Inline status message. Matches Figma "Alert" set:
Color (Info|Success|Warning|Danger|Neutral), Title/Description toggles.

Figma spec: radius-md (8), padding 14/16, gap 12, per-color bg + border + icon tokens.
Each color has a leading status icon tinted with its {color}/fg token.` } } },
  argTypes: { color: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] } },
  args: { color: 'info', title: 'Heads up', description: 'This is an alert with a description.' },
  decorators: [(S) => <div style={{ width: 420 }}><S /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { color: 'info', title: 'Information' } };
export const Success: Story = { args: { color: 'success', title: 'Success', description: 'Your changes were saved.' } };
export const Warning: Story = { args: { color: 'warning', title: 'Warning', description: 'Your session expires soon.' } };
export const Danger: Story = { args: { color: 'danger', title: 'Error', description: 'Something went wrong.' } };
export const Neutral: Story = { args: { color: 'neutral', title: 'Note', description: 'A neutral informational message.' } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 420 }}>
      <Alert color="info" title="Information" description="Info message." />
      <Alert color="success" title="Success" description="Success message." />
      <Alert color="warning" title="Warning" description="Warning message." />
      <Alert color="danger" title="Error" description="Error message." />
      <Alert color="neutral" title="Note" description="Neutral message." />
    </div>
  ),
};

/** Dark mode — the .dark class flips the semantic token layer; no component changes needed. */
export const DarkMode: Story = {
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarUpload } from './AvatarUpload';
import samplePhoto from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Application/Avatar Upload',
  component: AvatarUpload,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Profile photo picker. Matches Figma "Avatar Upload":
- **Orientation: Vertical** — big (64px) avatar with a camera badge overlapping its bottom-right corner, text or a "Change photo" link below. | Horizontal — avatar beside a text block and an Upload/Remove button.

"Filled" vs "Empty" isn't a separate prop to keep in sync -- it's derived
from whether \`src\` is set, same as any other data-driven avatar.

Functional: owns a hidden file input (same pattern as FileUpload), opened
by the badge, the "Change photo" link, or the "Upload" button. The picked
file is always handed back via \`onFileSelect\` for the real upload. Preview
is uncontrolled-by-default like a native input: pass no \`src\` and this
component shows the picked file itself (via a local object URL); pass
\`src\` and it's controlled -- the parent owns what's shown and is expected
to update \`src\` after its own upload completes.` } } },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<typeof AvatarUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalEmpty: Story = {};
export const VerticalFilled: Story = { args: { src: samplePhoto, alt: 'Amara Kalu' } };
export const HorizontalEmpty: Story = { args: { orientation: 'horizontal' } };
export const HorizontalFilled: Story = {
  args: { orientation: 'horizontal', src: samplePhoto, alt: 'Amara Kalu', onRemove: () => {} },
};

/** A file picked here is previewed immediately, same as a real consumer wiring src to state. */
export const Interactive: Story = {
  render: (args) => {
    const [src, setSrc] = React.useState<string | undefined>(args.src);
    return (
      <AvatarUpload
        {...args}
        src={src}
        onFileSelect={(file) => setSrc(URL.createObjectURL(file))}
        onRemove={() => setSrc(undefined)}
      />
    );
  },
};

export const DarkMode: Story = {
  args: { src: samplePhoto, alt: 'Amara Kalu' },
  decorators: [(S) => <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSettingsBlock } from './ProfileSettingsBlock';
import avatar from '../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Blocks/Application/Profile Settings',
  component: ProfileSettingsBlock,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `A COMPOSITION EXAMPLE, not a configurable component. Copy this file into
your project and edit it directly.

Matches Figma "Profile Settings": "Profile" heading -> AvatarUpload
(horizontal, reused unmodified -- its own filled/empty states already
are Figma's "Remove" (danger outline) vs "Upload" (outline) buttons) ->
Full name / Email inputs -> full-width "Save changes" Button.

Figma's "Filled"/"Empty" style isn't a manual prop here either -- every
piece already derives its own look from data (AvatarUpload from \`src\`,
each Input from its own value vs placeholder), same pattern used
throughout this Application set.` } } },
  decorators: [(S) => <div style={{ width: 440 }}><S /></div>],
} satisfies Meta<typeof ProfileSettingsBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    name: 'Sam Okpere',
    email: 'sam@sakani.com',
    avatarSrc: avatar,
  },
};

export const Empty: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: Filled.args,
  decorators: [(S) => <div className="dark" style={{ width: 440, padding: 24, background: 'var(--color-bg-canvas)' }}><S /></div>],
};

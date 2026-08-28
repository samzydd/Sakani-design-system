import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSettingsBlock } from './ProfileSettingsBlock';
import avatar from '../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Blocks/Application/Profile Settings',
  component: ProfileSettingsBlock,
  tags: ['autodocs'],
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

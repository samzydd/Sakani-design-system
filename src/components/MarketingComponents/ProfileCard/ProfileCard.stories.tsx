import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { XIcon, GithubIcon } from './SocialIcons';
import avatar from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Marketing/Profile Card',
  component: ProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks = [
  { icon: <XIcon />, label: 'X (Twitter)', href: '#' },
  { icon: <GithubIcon />, label: 'GitHub', href: '#' },
];

export const Compact: Story = {
  args: {
    name: 'Amara Kalu',
    role: 'Head of Product, Fintra',
    avatarSrc: avatar,
  },
};

export const Detailed: Story = {
  args: {
    name: 'Amara Kalu',
    role: 'Head of Product, Fintra',
    avatarSrc: avatar,
    bio: 'Leads product strategy across payments and fintech infrastructure.',
    socialLinks,
  },
};

export const DarkMode: Story = {
  args: {
    name: 'Amara Kalu',
    role: 'Head of Product, Fintra',
    avatarSrc: avatar,
    bio: 'Leads product strategy across payments and fintech infrastructure.',
    socialLinks,
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

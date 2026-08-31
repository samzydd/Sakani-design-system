import type { Meta, StoryObj } from '@storybook/react';
import { TeamCard } from './TeamCard';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './TeamSocialIcons';
import photo from '../../../assets/avatars/activity-chidi-duru.jpg';

const meta = {
  title: 'Marketing/Team Card',
  component: TeamCard,
  tags: ['autodocs'],
} satisfies Meta<typeof TeamCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks = [
  { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
  { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
  { icon: <LinkedinIcon />, label: 'LinkedIn', href: '#' },
];

export const Card: Story = {
  args: {
    image: photo,
    name: 'Chidi Duru',
    role: 'Design Lead',
    location: 'Lagos, Nigeria',
    socialLinks,
  },
};

export const CardDetails: Story = {
  args: {
    image: photo,
    name: 'Chidi Duru',
    role: 'Design Lead',
    location: 'Lagos, Nigeria',
    bio: 'Leads the design vision and strategy, guiding the team to craft cohesive, user-centered experiences from concept to launch.',
    socialLinks,
  },
};

export const DarkMode: Story = {
  args: {
    image: photo,
    name: 'Chidi Duru',
    role: 'Design Lead',
    location: 'Lagos, Nigeria',
    bio: 'Leads the design vision and strategy, guiding the team to craft cohesive, user-centered experiences from concept to launch.',
    socialLinks,
  },
  decorators: [(S) => (
    <div className="dark" style={{ padding: 24, background: 'var(--color-bg-canvas)' }}>
      <S />
    </div>
  )],
};

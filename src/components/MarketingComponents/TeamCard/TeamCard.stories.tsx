import type { Meta, StoryObj } from '@storybook/react';
import { TeamCard } from './TeamCard';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './TeamSocialIcons';
import photo from '../../../assets/marketing/team-card-chidi-duru.jpg';

const meta = {
  title: 'Marketing/Team Card',
  component: TeamCard,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Team Card" (Marketing primitives set, 2 styles: Card,
Card details). Whether the bio paragraph renders is derived from
\`bio\` presence, not a manual style prop -- same "derive from data"
pattern used throughout this library, same reasoning ProfileCard
gives for its own Compact/Detailed split.

The location line overlaid on the photo reuses the shared LocationDot
component directly -- but overridden to fg/on-inverse (white) text
via className, since LocationDot's own default text color (fg/muted)
is meant for a plain surface background, not a photo it needs to sit
legibly on top of. It sits inside a frosted glass scrim bar (a
translucent dark strip + backdrop blur spanning the image's full
width) added in a later Figma revision -- keeps the white text
legible over bright/high-contrast photo backgrounds specifically,
rather than relying on the raw photo always being dark enough there.

The 3 social icon chips reuse the shared FeaturedIcon component
(size="sm", variant="subtle" -- an exact match for Figma's own
accent/subtle-tinted 32px chip here, a different FeaturedIcon
treatment than SubFeature's own "light" variant). \`socialLinks\` takes
an arbitrary icon slot rather than a fixed 3-platform enum, same
reasoning ProfileCard gives for its own socialLinks -- see
TeamSocialIcons.tsx in this folder for real Instagram/Facebook/
LinkedIn glyphs to demonstrate that slot with.` } } },
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

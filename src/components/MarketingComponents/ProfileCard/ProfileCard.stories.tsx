import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { XIcon, GithubIcon } from './SocialIcons';
import avatar from '../../../assets/avatars/activity-amara-kalu.jpg';

const meta = {
  title: 'Marketing/Profile Card',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: `Matches Figma "Profile Card" (Marketing primitives set, 2 styles:
Compact, Detailed). Whether the Detailed layout renders is derived
from data, not a manual style prop -- same "derive from data" pattern
used throughout this library: a \`bio\` and/or \`socialLinks\` presence
means there's more to show than a bare name tag, so the card expands
into the centered, fuller layout; with neither, it stays the compact
horizontal row.

Avatar reuses the shared Avatar component (size="xl", an exact match
for Figma's own 48px avatar here). The social icon buttons are NOT
the shared IconButton: none of its 5 variants produce Figma's own
bg/surface + shadow/xs + no-border look, same reasoning
MobileNavigationMenu's own toggle button and WishlistButton give for
building that exact shape locally instead. \`socialLinks\` takes an
arbitrary icon slot rather than a fixed X/GitHub enum, since a real
profile card needs to support whatever platforms a person actually
links (LinkedIn, a personal site, etc.), not just Figma's two
examples -- SocialIcons.tsx in this same folder provides real X and
GitHub marks for the story to demonstrate that slot with (traced from
SVGs downloaded from the Figma file -- lucide-react ships no brand
icons in the version this library uses -- but reimplemented as inline
\`currentColor\` components rather than kept as static image assets:
the raw downloads hardcode opaque black fills, which went invisible
against this card's own dark-mode social button until switched to
\`currentColor\`, since an \`<img src>\` reference can't be recolored
from outside by the parent's theme-aware CSS the way an inline SVG
can).` } } },
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
